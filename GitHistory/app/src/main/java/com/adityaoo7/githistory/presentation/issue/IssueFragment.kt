package com.adityaoo7.githistory.presentation.issue

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import com.adityaoo7.githistory.GitHistoryApp
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.databinding.FragmentIssueBinding
import com.adityaoo7.githistory.utils.convertToSimpleDateAndTime
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.transition.MaterialSharedAxis
import javax.inject.Inject

class IssueFragment : Fragment() {

    private lateinit var binding: FragmentIssueBinding

    private val args: IssueFragmentArgs by navArgs()

    @Inject
    lateinit var dataSource: IDataSource

    private val model: IssueViewModel by viewModels {
        IssueViewModelFactory(dataSource, args.issue, args.userName, args.repoName)
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

        returnTransition = MaterialSharedAxis(MaterialSharedAxis.X, false).apply {
            duration = resources.getInteger(R.integer.material_motion_duration_long_1).toLong()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentIssueBinding.inflate(inflater, container, false).apply {
            viewModel = model
        }
        val issue = args.issue
        val issueNumberText = "#${issue.number}"
        binding.issueNumber.text = issueNumberText
        val author = "By ${issue.author.userName}"
        binding.issueAuthorTextView.text = author
        binding.issueDateTextView.text = issue.date.convertToSimpleDateAndTime()

        val adapter = CommentListAdapter()

        binding.commentList.adapter = adapter

        binding.commentListRefreshLayout.setOnRefreshListener {
            model.refresh()
        }

        model.comments.observe(viewLifecycleOwner, { comments ->
            adapter.submitList(comments)
        })

        model.loading.observe(viewLifecycleOwner, { isLoading ->
            if (isLoading) {
                binding.loadingCommentsProgressBar.visibility = View.VISIBLE
                binding.commentList.visibility = View.INVISIBLE
            } else {
                binding.loadingCommentsProgressBar.visibility = View.GONE
                binding.commentList.visibility = View.VISIBLE
                binding.commentListRefreshLayout.isRefreshing = false
            }
        })

        model.error.observe(viewLifecycleOwner, { errorMessage ->
            if (errorMessage != null) {
                Snackbar.make(requireView(), errorMessage, Snackbar.LENGTH_INDEFINITE)
                    .setAction("Close") {}
                    .show()
            }
        })

        model.empty.observe(viewLifecycleOwner, { isEmpty ->
            if (isEmpty) {
                binding.commentListRefreshLayout.visibility = View.GONE
                binding.emptyCommentList.visibility = View.VISIBLE
            } else {
                binding.commentListRefreshLayout.visibility = View.VISIBLE
                binding.emptyCommentList.visibility = View.GONE
            }
        })

        return binding.root
    }
}