package com.example.githubapp.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.AsyncListDiffer
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.githubapp.databinding.ItemUserBinding
import com.example.githubapp.models.Item

class UserAdapter :
    RecyclerView.Adapter<UserAdapter.UserViewHolder>() {


    companion object {
        const val TAG = "CategoriesAdapter"
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewCategory: Int): UserViewHolder {
        val itemCategoryBinding = ItemUserBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return UserViewHolder(itemCategoryBinding)
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        holder.setUser(differ.currentList[position])
    }

    override fun getItemCount(): Int {
        return differ.currentList.size
    }

    inner class UserViewHolder(private val binding: ItemUserBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun setUser(user: Item) {
            binding.userName.text = user.login
            Glide.with(binding.root)
                .load(user.avatar_url)
                .into(binding.userImage)
            binding.linkGithub.setOnClickListener {
                onGithubLinkClickListener?.let { it(user) }
            }
            binding.linkRepos.setOnClickListener {
                onRepoClickListener?.let { it(user) }
            }

        }
    }

    private var onRepoClickListener: ((Item) -> Unit)? = null

    fun setOnRepoClickListener(listener: (Item) -> Unit) {
        onRepoClickListener = listener
    }

    private var onGithubLinkClickListener: ((Item) -> Unit)? = null

    fun setOnGithubLinkClickListener(listener: (Item) -> Unit) {
        onGithubLinkClickListener = listener
    }

    private val differCallback = object : DiffUtil.ItemCallback<Item>() {
        override fun areItemsTheSame(oldItem: Item, newItem: Item): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Item, newItem: Item): Boolean {
            return oldItem == newItem
        }
    }

    val differ = AsyncListDiffer(this, differCallback)

}