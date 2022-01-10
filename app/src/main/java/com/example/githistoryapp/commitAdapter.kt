package com.example.githistoryapp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class commitAdapter(private val commitslist:List<exampleCommit>):RecyclerView.Adapter<commitAdapter.commitViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): commitViewHolder {
        val itemview=LayoutInflater.from(parent.context).inflate(R.layout.commit,parent,false)
        return commitViewHolder(itemview)
    }

    override fun onBindViewHolder(holder: commitViewHolder, position: Int) {
        val currentitem=commitslist[position]
        holder.sha.text=currentitem.SHA
        holder.message.text=currentitem.message
    }

    override fun getItemCount()=commitslist.size

    class commitViewHolder(itemview:View):RecyclerView.ViewHolder(itemview){
        val sha:TextView=itemview.findViewById(R.id.Recyclercommitsha)
        val message:TextView=itemview.findViewById(R.id.Recyclercommitmessage)
    }
}