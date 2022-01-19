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
import com.android.androidcoroutinedemokotlin.models.RecyclerData
import com.squareup.picasso.Picasso

class IssueAdapter: RecyclerView.Adapter<IssueAdapter.MyViewHolder>(){

    var items = ArrayList<RecyclerData>()
//    private lateinit var mlistner:onItemClickListner
//    interface onItemClickListner{
//        fun onItemClicked(position: Int)
//    }
//    fun setonItemClickListner(listner:onItemClickListner){
//        mlistner=listner
//    }

    fun setUpdatedData(items : ArrayList<RecyclerData>) {
        this.items.clear()
        this.items=items
        notifyDataSetChanged()
    }
    class MyViewHolder(view: View): RecyclerView.ViewHolder(view) {
        val imageThumb = view.findViewById<ImageView>(R.id.imageThumb)
        val tvTitle = view.findViewById<TextView>(R.id.tvTitle)
        val tvDesc = view.findViewById<TextView>(R.id.tvDesc)
        fun bind(data : RecyclerData) {
            var num1:String="Issue Title: "
            tvTitle.text =num1+ data.title
            var num:String="User Name: "
            tvDesc.text = num+data.user.login
            val url  = data.user.avatar_url
            Picasso.get()
                .load(url)
                .into(imageThumb)





        }
//        init {
//            view.setOnClickListener{
//                listner.onItemClicked(adapterPosition)
//            }
//        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.recycler_list_row, parent, false)

        return MyViewHolder(view)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val animation: Animation = AnimationUtils.loadAnimation(holder.itemView.context, R.anim.anim1)
        holder.bind(items.get(position))
        holder.itemView.startAnimation(animation)
    }
    private var onItemClickListener: ((RecyclerData) -> Unit)? = null




}