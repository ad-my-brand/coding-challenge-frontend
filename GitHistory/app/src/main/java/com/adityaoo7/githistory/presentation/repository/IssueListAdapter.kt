package com.adityaoo7.githistory.presentation.repository

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.adityaoo7.githistory.databinding.IssueListItemBinding
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.utils.convertToSimpleDateAndTime

/**
 * List adapter of [RecyclerView] for list of [Issue].
 * @param viewModel view model of type [RepositoryViewModel]
 */
class IssueListAdapter(private val viewModel: RepositoryViewModel) :
    ListAdapter<Issue, IssueListAdapter.ViewHolder>(IssueDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = getItem(position)
        holder.bind(viewModel, item)
    }

    class ViewHolder private constructor(private val binding: IssueListItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(viewModel: RepositoryViewModel, item: Issue) {
            binding.viewModel = viewModel
            binding.issue = item
            binding.issueDate.text = item.date.convertToSimpleDateAndTime()
            val issueNumber = "#${item.number}"
            binding.listIssueNumberText.text = issueNumber

            binding.executePendingBindings()
        }

        companion object {
            fun from(parent: ViewGroup): ViewHolder {
                val layoutInflater = LayoutInflater.from(parent.context)
                val binding = IssueListItemBinding.inflate(layoutInflater, parent, false)

                return ViewHolder(binding)
            }
        }
    }
}

class IssueDiffCallback : DiffUtil.ItemCallback<Issue>() {
    override fun areItemsTheSame(oldItem: Issue, newItem: Issue): Boolean {
        return oldItem.number == newItem.number
    }

    override fun areContentsTheSame(oldItem: Issue, newItem: Issue): Boolean {
        return oldItem == newItem
    }

}