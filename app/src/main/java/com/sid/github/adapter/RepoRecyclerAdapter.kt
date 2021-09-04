package com.sid.github.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.sid.github.R
import com.sid.github.model.Repo

class RepoRecyclerAdapter(private val context : Context, private val repoList : ArrayList<Repo>) : RecyclerView.Adapter<RepoRecyclerAdapter.RepoViewHolder>() {

    class RepoViewHolder(view:View) : RecyclerView.ViewHolder(view){
        val rName : TextView = view.findViewById(R.id.repoName)
        val rDesc : TextView = view.findViewById(R.id.repoDesc)
        val rLang : TextView = view.findViewById(R.id.repoLang)
        val rStar : TextView = view.findViewById(R.id.repoStar)
        val rFork : TextView = view.findViewById(R.id.repoFork)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RepoViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.repository_row, parent, false)
        return RepoViewHolder(view)
    }

    override fun getItemCount(): Int {
        return repoList.size
    }

    override fun onBindViewHolder(holder: RepoViewHolder, position: Int) {
        val repos = repoList[position]

        holder.rName.text = repos.getRepoName()
        if(repos.getRepoDesc() != null){
            holder.rDesc.visibility = View.VISIBLE
            holder.rDesc.text = repos.getRepoDesc()
        }
        if(repos.getRepoLang() != null){
            holder.rLang.visibility = View.VISIBLE
            holder.rLang.text = repos.getRepoLang()
        }
        holder.rStar.text = repos.getRepoStar()
        holder.rFork.text = repos.getRepoFork()

        println("Response is -> ${repos.getRepoName()} ${repos.getRepoDesc()} ${repos.getRepoLang()} ${repos.getRepoStar()} ${repos.getRepoFork()}")
    }

}