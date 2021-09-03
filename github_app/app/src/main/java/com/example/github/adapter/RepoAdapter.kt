package com.example.github.adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.github.databinding.ItemReposBinding
import com.example.github.issues.IssuesActivity
import com.example.github.models.Repository

class RepoAdapter(private val list: ArrayList<Repository>, private val context: Context, private val user: String)
    : RecyclerView.Adapter<RepoAdapter.ViewHolder>() {

        inner class ViewHolder(val binding: ItemReposBinding): RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(ItemReposBinding.inflate(LayoutInflater.from(parent.context), parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        with(holder) {
            with(list[position]) {
                binding.repoName.text = name
                binding.desc.text = description
                binding.star.text = stargazers_count.toString()
                binding.language.text = language
            }
        }

        holder.itemView.setOnClickListener {
            val intent = Intent(context, IssuesActivity::class.java)
            intent.putExtra("dir", "$user / ${list[position].name}")
            intent.putExtra("name", user)
            intent.putExtra("repo", list[position].name)
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int {
        return list.size
    }


}