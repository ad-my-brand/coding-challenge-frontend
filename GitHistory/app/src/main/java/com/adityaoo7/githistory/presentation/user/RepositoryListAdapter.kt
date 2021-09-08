package com.adityaoo7.githistory.presentation.user

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.adityaoo7.githistory.databinding.RepositoryListItemBinding
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.presentation.repository.RepositoryViewModel

/**
 * List adapter of [RecyclerView] for list of [Repository].
 * @param viewModel view model of type [UserViewModel]
 */
class RepositoryListAdapter(private val viewModel: UserViewModel) :
    ListAdapter<Repository, RepositoryListAdapter.ViewHolder>(RepoDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = getItem(position)
        holder.bind(viewModel, item)
    }

    class ViewHolder private constructor(private val binding: RepositoryListItemBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(viewModel: UserViewModel, item: Repository) {
            binding.viewModel = viewModel
            binding.repository = item
            binding.starsTextView.text = item.stars.toString()
            binding.forksTextView.text = item.forks.toString()
            binding.executePendingBindings()
        }

        companion object {
            fun from(parent: ViewGroup): ViewHolder {
                val layoutInflater = LayoutInflater.from(parent.context)
                val binding = RepositoryListItemBinding.inflate(layoutInflater, parent, false)

                return ViewHolder(binding)
            }
        }
    }
}

class RepoDiffCallback : DiffUtil.ItemCallback<Repository>() {
    override fun areItemsTheSame(oldItem: Repository, newItem: Repository): Boolean {
        return oldItem.name == newItem.name
    }

    override fun areContentsTheSame(oldItem: Repository, newItem: Repository): Boolean {
        return oldItem == newItem
    }

}