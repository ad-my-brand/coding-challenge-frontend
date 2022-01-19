package com.android.androidcoroutinedemokotlin.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.android.androidcoroutinedemokotlin.R
import com.android.androidcoroutinedemokotlin.databinding.RepoRowBinding
import com.android.androidcoroutinedemokotlin.models.RecyclerData
import com.squareup.picasso.Picasso

class RepoAdapter : RecyclerView.Adapter<RepoAdapter.MyViewHolder>(){

    var items = ArrayList<RecyclerData>()
    private lateinit var mlistner:onItemClickListner
    interface onItemClickListner{
        fun onItemClicked(position: Int)
    }
    fun setonItemClickListner(listner:onItemClickListner){
        mlistner=listner
    }

    fun setUpdatedData(items : ArrayList<RecyclerData>) {
        this.items.clear()
        this.items=items
        notifyDataSetChanged()
    }
    class MyViewHolder(view: View,listner: onItemClickListner): RecyclerView.ViewHolder(view) {

        val tvTitle = view.findViewById<TextView>(R.id.tvTitle1)
        val tvDesc = view.findViewById<TextView>(R.id.tvDesc1)
        fun bind(data : RecyclerData) {
            var num1:String="RepoName: "
            tvTitle.text =num1+ data.name
            var num:String="Description: "
            var des:String=data.description
            if(des==null){
                tvDesc.text = num+"No description available.."
            }else{
                tvDesc.text = num+des
            }





        }
        init {
            view.setOnClickListener{
                listner.onItemClicked(adapterPosition)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.repo_row, parent, false)

        return MyViewHolder(view,mlistner)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
       val animation:Animation=AnimationUtils.loadAnimation(holder.itemView.context,R.anim.anim1)
        holder.bind(items.get(position))
        holder.itemView.startAnimation(animation)
    }
    private var onItemClickListener: ((RecyclerData) -> Unit)? = null



}