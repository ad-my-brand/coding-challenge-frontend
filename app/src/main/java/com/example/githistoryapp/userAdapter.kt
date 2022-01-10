package com.example.githistoryapp

import android.view.LayoutInflater
import android.view.OnReceiveContentListener
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import exampleUser

class userAdapter(private val userslist:ArrayList<exampleUser>,

                  ):RecyclerView.Adapter<userAdapter.userViewHolder>() {
    private lateinit var mlistener:onItemClickListener
    interface onItemClickListener{
        fun onItemClick(position: Int)
    }

    fun setOnItemClickListener(listener:onItemClickListener){
        mlistener=listener
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): userViewHolder {
        val itemview=LayoutInflater.from(parent.context).inflate(R.layout.user,parent,false)
        return userViewHolder(itemview,mlistener)
    }

    override fun onBindViewHolder(holder: userViewHolder, position: Int) {
        val currentitem=userslist[position]
        holder.textView.text=currentitem.username
    }

    override fun getItemCount()=userslist.size

    inner class userViewHolder(itemview:View,listener:onItemClickListener):RecyclerView.ViewHolder(itemview){
            val textView:TextView=itemview.findViewById(R.id.RecyclerUser)
            init {
                itemview.setOnClickListener {
                    listener.onItemClick(absoluteAdapterPosition)
                }
            }
    }

}