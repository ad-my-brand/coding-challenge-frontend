package com.example.githubapp.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.AsyncListDiffer
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.githubapp.databinding.ItemReposBinding
import com.example.githubapp.databinding.ItemUserBinding
import com.example.githubapp.models.Item
import com.example.githubapp.models.repositoryResponseItem

class ReposAdapter :
    RecyclerView.Adapter<ReposAdapter.ReposViewHolder>() {

    companion object {
        const val TAG = "ReposAdapter"
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewCategory: Int): ReposViewHolder {
        val itemReposBinding = ItemReposBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ReposViewHolder(itemReposBinding)
    }

    override fun onBindViewHolder(holder: ReposViewHolder, position: Int) {
        holder.setRepos(differ.currentList[position])
    }

    override fun getItemCount(): Int {
        return differ.currentList.size
    }

    inner class ReposViewHolder(private val binding: ItemReposBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun setRepos(repos: repositoryResponseItem) {
            binding.repoName.apply{
                this.text=repos.full_name
                this.paint.isUnderlineText=true
                setOnClickListener {
                    onRepoClickListener?.let{ it(repos)}
                }
            }
            binding.repoDescription.text=repos.description
            binding.issuesNumber.text=repos.open_issues_count.toString()
            binding.forksNumber.text=repos.forks_count.toString()
            binding.starsNumber.text=repos.stargazers_count.toString()
        }
    }

    private var onRepoClickListener: ((repositoryResponseItem) -> Unit)? = null

    fun setOnRepoClickListener(listener: (repositoryResponseItem) -> Unit) {
        onRepoClickListener = listener
    }


    private val differCallback = object : DiffUtil.ItemCallback<repositoryResponseItem>() {
        override fun areItemsTheSame(oldItem: repositoryResponseItem, newItem: repositoryResponseItem): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: repositoryResponseItem, newItem: repositoryResponseItem): Boolean {
            return oldItem == newItem
        }
    }

    val differ = AsyncListDiffer(this, differCallback)

}