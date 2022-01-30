package com.example.githubapp.ui.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AbsListView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.githubapp.R
import com.example.githubapp.adapters.ReposAdapter
import com.example.githubapp.databinding.FragmentReposBinding
import com.example.githubapp.ui.MainActivity
import com.example.githubapp.ui.viewModels.GitHubViewModel
import com.example.githubapp.util.Constants
import com.example.githubapp.util.Resource
import com.example.githubapp.util.Status

class ReposFragment : Fragment(R.layout.fragment_repos) {

    companion object {
        const val TAG = "ReposFragment"
    }

    private lateinit var viewModel: GitHubViewModel
    private lateinit var binding: FragmentReposBinding
    private lateinit var reposAdapter: ReposAdapter

    val args: ReposFragmentArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentReposBinding.inflate(inflater, container, false)

        viewModel = (activity as MainActivity).viewModel

        setUpRecyclerView()

        viewModel.getRepos(args.userName)

        viewModel.repos.observe(viewLifecycleOwner, { response ->
            if (response != null) {
                when (response.status) {
                    Status.SUCCESS -> {
                        hideProgressBar()
                        response.data?.let {
                            reposAdapter.differ.submitList(it.toList())
                            val totalPages =
                                (it.toList().size.div(Constants.DEFAULT_ITEMS_PER_PAGE)) + 2
                            isLastPage = viewModel.reposPage == totalPages
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

        reposAdapter.setOnRepoClickListener {
            val action =
                ReposFragmentDirections.actionReposFragmentToIssuesFragment(args.userName, it.name)
            findNavController().navigate(action)
        }

        return binding.root
    }

    private fun setUpRecyclerView() {
        reposAdapter = ReposAdapter()
        binding.rvSearchNews.apply {
            adapter = reposAdapter
            layoutManager = LinearLayoutManager(requireContext())
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
        viewModel.repos.value = null
        viewModel.repositoryResponse = null
        viewModel.reposPage = 0
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
                viewModel.getRepos(args.userName)
                isScrolling = false
            } else {
                binding.rvSearchNews.setPadding(0, 0, 0, 0)
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