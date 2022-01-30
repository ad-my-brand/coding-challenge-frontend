package com.example.githubapp.ui.fragments

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AbsListView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.githubapp.R
import com.example.githubapp.adapters.IssuesAdapter
import com.example.githubapp.databinding.FragmentIssuesBinding
import com.example.githubapp.ui.MainActivity
import com.example.githubapp.ui.viewModels.GitHubViewModel
import com.example.githubapp.util.Constants
import com.example.githubapp.util.Resource
import com.example.githubapp.util.Status

class IssuesFragment : Fragment(R.layout.fragment_issues) {

    companion object {
        const val TAG = "IssuesFragment"
    }
    private lateinit var viewModel: GitHubViewModel
    private lateinit var binding: FragmentIssuesBinding
    private lateinit var issueAdapter: IssuesAdapter

    private val args: IssuesFragmentArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding= FragmentIssuesBinding.inflate(inflater,container,false)

        viewModel=(activity as MainActivity).viewModel

        setUpRecyclerView()

        viewModel.getIssues(args.username,args.reponame)
        
        viewModel.issues.observe(viewLifecycleOwner, { response ->
            if(response!=null) {
                when (response.status) {
                    Status.SUCCESS -> {
                        hideProgressBar()
                        response.data?.let {
                            issueAdapter.differ.submitList(it.toList())
                            val totalPages =
                                (it.toList().size.div(Constants.DEFAULT_ITEMS_PER_PAGE)) + 2
                            isLastPage = viewModel.issuesPage == totalPages
                        }
                    }
                    Status.ERROR -> {
                        hideProgressBar()
                        response.message?.let {
                            Toast.makeText(requireContext(), it, Toast.LENGTH_LONG)
                                .show()
                        }
                    }
                    Status.LOADING -> {
                        showProgressBar()
                    }
                }
            }
        })

        issueAdapter.setOnIssueClickListener {
            val intent= Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse(it.html_url)
            startActivity(intent)
        }


        return binding.root
    }

    private fun setUpRecyclerView() {
        issueAdapter = IssuesAdapter()
        binding.rvIssues.apply {
            adapter = issueAdapter
            layoutManager= LinearLayoutManager(requireContext())
            addOnScrollListener(scrollListener)
        }
    }

    private fun hideProgressBar() {
        binding.progressBar.visibility = View.INVISIBLE
        isLoading = false
    }

    private fun showProgressBar() {
        binding.progressBar.visibility = View.VISIBLE
        isLoading = true
    }

    override fun onDestroy() {
        super.onDestroy()
        viewModel.issues.value=null
        viewModel.issuesResponse = null
        viewModel.issuesPage = 0
    }


    var isLoading = false
    var isLastPage = false
    var isScrolling = false

    private val scrollListener = object : RecyclerView.OnScrollListener() {
        override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
            super.onScrolled(recyclerView, dx, dy)

            val layoutManager = recyclerView.layoutManager as LinearLayoutManager
            val firstVisibleItemPosition = layoutManager.findFirstVisibleItemPosition()
            val visibleItemCount = layoutManager.childCount
            val totalItemCount = layoutManager.itemCount

            val isNotLoadingAndNoLastPage = !isLoading && !isLastPage
            val isAtLastItem = firstVisibleItemPosition + visibleItemCount >= totalItemCount
            val isNotAtBeginning = firstVisibleItemPosition >= 0
            val isTotalMoreThanVisible = totalItemCount >= Constants.DEFAULT_ITEMS_PER_PAGE
            val shouldPaginate = isNotLoadingAndNoLastPage && isAtLastItem && isNotAtBeginning &&
                    isTotalMoreThanVisible && isScrolling

            Log.d(SearchFragment.TAG, "shouldPaginate:${shouldPaginate}")
            if (shouldPaginate) {
                viewModel.getIssues(args.username,args.reponame)
                isScrolling = false
            } else {
                binding.rvIssues.setPadding(0, 0, 0, 0)
            }
        }

        override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
            super.onScrollStateChanged(recyclerView, newState)
            if (newState == AbsListView.OnScrollListener.SCROLL_STATE_TOUCH_SCROLL) {
                isScrolling = true
            }
        }

    }
}