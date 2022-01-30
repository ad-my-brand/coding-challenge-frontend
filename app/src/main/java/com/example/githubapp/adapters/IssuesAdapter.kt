package com.example.githubapp.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.AsyncListDiffer
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.githubapp.databinding.ItemIssuesBinding
import com.example.githubapp.databinding.ItemReposBinding
import com.example.githubapp.databinding.ItemUserBinding
import com.example.githubapp.models.Item
import com.example.githubapp.models.issuesResponseItem
import com.example.githubapp.models.repositoryResponseItem

class IssuesAdapter :
    RecyclerView.Adapter<IssuesAdapter.IssuesViewHolder>() {

    companion object {
        const val TAG = "IssuesAdapter"
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewCategory: Int): IssuesViewHolder {
        val itemIssuesBinding = ItemIssuesBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return IssuesViewHolder(itemIssuesBinding)
    }

    override fun onBindViewHolder(holder: IssuesViewHolder, position: Int) {
        holder.setIssues(differ.currentList[position])
    }

    override fun getItemCount(): Int {
        return differ.currentList.size
    }

    inner class IssuesViewHolder(private val binding: ItemIssuesBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun setIssues(issue: issuesResponseItem) {
            val issueNumber = "#" + issue.number.toString()
            binding.issueNumber.text = issueNumber
            binding.issuesStatus.text = issue.state
            binding.issuesTitle.text = issue.title
            Glide.with(binding.root)
                .load(issue.user.avatar_url)
                .into(binding.issuesCreatorImage)
            binding.issuesCreatorName.text = issue.user.login
            binding.issuesCreatedAt.text = issue.created_at.toString()
            binding.issuesClosedAt.text = issue.closed_at?.toString() ?: "not closed"
            binding.issuesDescription.text = issue.body
            binding.root.setOnClickListener {
                onIssueClickListener?.let { it(issue) }
            }
        }
    }

    private var onIssueClickListener: ((issuesResponseItem) -> Unit)? = null

    fun setOnIssueClickListener(listener: (issuesResponseItem) -> Unit) {
        onIssueClickListener = listener
    }


    private val differCallback = object : DiffUtil.ItemCallback<issuesResponseItem>() {
        override fun areItemsTheSame(
            oldItem: issuesResponseItem,
            newItem: issuesResponseItem
        ): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(
            oldItem: issuesResponseItem,
            newItem: issuesResponseItem
        ): Boolean {
            return oldItem == newItem
        }
    }

    val differ = AsyncListDiffer(this, differCallback)

}