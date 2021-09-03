package com.example.github.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.text.TextUtils
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.recyclerview.widget.RecyclerView
import com.example.github.databinding.ItemIssuesBinding
import com.example.github.models.Issue

class IssuesAdapter(private val list: ArrayList<Issue>, private val  context: Context, private val dir: String)
    : RecyclerView.Adapter<IssuesAdapter.ViewHolder>() {

        inner class ViewHolder(val binding: ItemIssuesBinding): RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): IssuesAdapter.ViewHolder {
        return ViewHolder(ItemIssuesBinding.inflate(LayoutInflater.from(parent.context), parent, false))
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: IssuesAdapter.ViewHolder, position: Int) {
        with(holder) {
            with(list[position]) {
                binding.dir.text = dir
                binding.title.text = title
                binding.comment.text = comments.toString()

                if (number!! > 0) {
                    binding.number.text = "#$number"
                } else {
                    binding.number.isVisible = false
                }

                if (TextUtils.equals(state, "open")) {
                    binding.open.isVisible = true
                    binding.close.isVisible = false
                } else {
                    binding.open.isVisible = false
                    binding.close.isVisible = true
                }
            }
        }
    }

    override fun getItemCount(): Int {
        return list.size
    }

}