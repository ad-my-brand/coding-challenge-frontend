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
import androidx.core.widget.addTextChangedListener
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.githubapp.R
import com.example.githubapp.adapters.UserAdapter
import com.example.githubapp.databinding.FragmentSearchBinding
import com.example.githubapp.ui.MainActivity
import com.example.githubapp.ui.viewModels.GitHubViewModel
import com.example.githubapp.util.Constants.Companion.DEFAULT_ITEMS_PER_PAGE
import com.example.githubapp.util.Constants.Companion.SEARCH_DELAY
import com.example.githubapp.util.Resource
import com.example.githubapp.util.Status
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class SearchFragment : Fragment(R.layout.fragment_search) {

    companion object {
        const val TAG = "SearchFragment"
    }

    private lateinit var viewModel: GitHubViewModel
    private lateinit var userAdapter: UserAdapter
    private lateinit var binding: FragmentSearchBinding
    private lateinit var lastSearch: String

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_search, container, false)

        viewModel = (activity as MainActivity).viewModel

        setUpRecyclerView()

//        filterAdapter.setOnItemClickListener {
//            val bundle= Bundle().apply {
//                putString("RecipeID", it.idMeal)
//            }
//            findNavController().navigate(
//                R.id.action_searchFragment_to_recipeFragment,
//                bundle
//            )
//        }

        userAdapter.setOnGithubLinkClickListener {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse(it.html_url)
            startActivity(intent)
        }

        userAdapter.setOnRepoClickListener {
            val action = SearchFragmentDirections.actionSearchFragmentToReposFragment(it.login)
            findNavController().navigate(action)
        }

        var job: Job? = null
        binding.etSearch.addTextChangedListener {
            job?.cancel()
            job = MainScope().launch {
                delay(SEARCH_DELAY)
                it?.let {
                    if (it.toString().isNotEmpty()) {
                        binding.searchImage.visibility = View.INVISIBLE
                        binding.rvSearchNews.visibility = View.VISIBLE
                        viewModel.searchUserResponse = null
                        viewModel.users.value = null
                        viewModel.searchUsersPage = 0
                        binding.rvSearchNews.smoothScrollToPosition(0)
                        viewModel.search(it.toString())
                        lastSearch = it.toString()
                    }
                }
            }
        }

        viewModel.users.observe(viewLifecycleOwner, { response ->
            if (response != null) {
                when (response.status) {
                    Status.SUCCESS -> {
                        hideProgressBar()
                        response.data?.let {
                            binding.noUsersTv.visibility = View.INVISIBLE
                            userAdapter.differ.submitList(it.items?.toList())
                            val totalPages =
                                (it.items?.toList()?.size?.div(DEFAULT_ITEMS_PER_PAGE) ?: 0) + 2
                            isLastPage = viewModel.searchUsersPage == totalPages
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


        return binding.root
    }

    private fun setUpRecyclerView() {
        userAdapter = UserAdapter()
        binding.rvSearchNews.apply {
            adapter = userAdapter
            layoutManager = LinearLayoutManager(requireContext())
            addOnScrollListener(this@SearchFragment.scrollListener)
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
            val isTotalMoreThanVisible = totalItemCount >= DEFAULT_ITEMS_PER_PAGE
            val shouldPaginate = isNotLoadingAndNoLastPage && isAtLastItem && isNotAtBeginning &&
                    isTotalMoreThanVisible && isScrolling

            Log.d(TAG, "shouldPaginate:${shouldPaginate}")
            if (shouldPaginate) {
                viewModel.search(lastSearch)
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