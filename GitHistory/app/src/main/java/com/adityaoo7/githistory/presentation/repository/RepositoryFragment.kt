package com.adityaoo7.githistory.presentation.repository

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.adityaoo7.githistory.GitHistoryApp
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.databinding.FragmentRepositoryBinding
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.transition.MaterialSharedAxis
import javax.inject.Inject

class RepositoryFragment : Fragment() {

    private lateinit var binding: FragmentRepositoryBinding

    private val args: RepositoryFragmentArgs by navArgs()

    @Inject
    lateinit var dataSource: IDataSource

    private val model: RepositoryViewModel by viewModels {
        RepositoryViewModelFactory(dataSource, args.repository, args.userName)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        (requireActivity().application as GitHistoryApp).appComponent.inject(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enterTransition = MaterialSharedAxis(MaterialSharedAxis.X, true).apply {
            duration = resources.getInteger(R.integer.material_motion_duration_long_1).toLong()
        }

        reenterTransition = MaterialSharedAxis(MaterialSharedAxis.X, false).apply {
            duration =
                resources.getInteger(R.integer.material_motion_duration_long_1).toLong()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentRepositoryBinding.inflate(inflater, container, false).apply {
            viewModel = model
        }


        val repository = args.repository

        binding.repoStars.text = repository.stars.toString()
        binding.repoForks.text = repository.forks.toString()

        val adapter = IssueListAdapter(model)

        binding.issuesList.adapter = adapter

        binding.issueListRefreshLayout.setOnRefreshListener {
            model.refresh()
        }

        model.issues.observe(viewLifecycleOwner, { issues ->
            adapter.submitList(issues)
        })

        model.loading.observe(viewLifecycleOwner, { isLoading ->
            if (isLoading) {
                binding.loadingIssuesProgressBar.visibility = View.VISIBLE
                binding.issuesList.visibility = View.INVISIBLE
            } else {
                binding.loadingIssuesProgressBar.visibility = View.GONE
                binding.issuesList.visibility = View.VISIBLE
                binding.issueListRefreshLayout.isRefreshing = false
            }
        })

        model.error.observe(viewLifecycleOwner, { errorMessage ->
            if (errorMessage != null) {
                Snackbar.make(requireView(), errorMessage, Snackbar.LENGTH_INDEFINITE)
                    .setAction("Close") {}
                    .show()
            }
        })

        model.navigateToIssue.observe(viewLifecycleOwner, { issue ->
            if (issue != null) {
                findNavController().navigate(
                    RepositoryFragmentDirections.actionRepositoryFragmentToIssueFragment(
                        issue,
                        args.userName,
                        repository.name
                    )
                )
                model.doneNavigating()
            }
        })

        model.empty.observe(viewLifecycleOwner, { isEmpty ->
            if (isEmpty) {
                binding.issueListRefreshLayout.visibility = View.GONE
                binding.emptyIssueListText.visibility = View.VISIBLE
            } else {
                binding.issueListRefreshLayout.visibility = View.VISIBLE
                binding.emptyIssueListText.visibility = View.GONE
            }
        })

        return binding.root
    }
}