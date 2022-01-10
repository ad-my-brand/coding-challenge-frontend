package com.example.githistoryapp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class repoAdapter(private val reposlists:List<repoExample>):RecyclerView.Adapter<repoAdapter.repoViewHolder>() {

    private lateinit var mlistener:onItemClickListener
    interface onItemClickListener{
        fun onItemClick(position: Int)
    }
    fun setOnItemClickListener(listener:onItemClickListener){
        mlistener=listener
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): repoViewHolder {
        val itemview=LayoutInflater.from(parent.context).inflate(R.layout.repo,parent,false)
        return repoViewHolder(itemview,mlistener)
    }

    override fun onBindViewHolder(holder: repoViewHolder, position: Int) {
        val currentitem=reposlists[position]
        holder.textview.text=currentitem.reponame
    }

    override fun getItemCount()=reposlists.size

    class repoViewHolder(itemview:View,listener:onItemClickListener):RecyclerView.ViewHolder(itemview){
            val textview:TextView=itemview.findViewById(R.id.RecyclerRepo)
            init {
                itemview.setOnClickListener {
                    listener.onItemClick(absoluteAdapterPosition)
                }
            }
    }
}