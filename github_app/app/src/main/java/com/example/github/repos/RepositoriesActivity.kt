package com.example.github.repos

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.github.R
import com.example.github.adapter.RepoAdapter
import com.example.github.databinding.ActivityRepositoriesBinding
import com.example.github.factory.ReposViewModelFactory
import com.example.github.models.Repository
import com.example.github.repositories.ReposRepository
import com.example.github.viewModels.ReposViewModel

class RepositoriesActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRepositoriesBinding
    private lateinit var viewModel: ReposViewModel

    private var list = ArrayList<Repository>()
    private lateinit var adapter: RepoAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRepositoriesBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val repository = ReposRepository()
        val viewModelFactory = ReposViewModelFactory(repository = repository)
        viewModel = ViewModelProvider(this, viewModelFactory).get(ReposViewModel::class.java)

    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onStart() {
        super.onStart()

        val linearLayoutManager = LinearLayoutManager(
            this@RepositoriesActivity,
            LinearLayoutManager.VERTICAL,
            false
        )

        var user = ""
        val intent = intent
        if (intent != null) {
            if (intent.hasExtra("user_name")) {
                intent.getStringExtra("user_name")?.let {
                    viewModel.getRepos(it)
                    binding.userName.text = it
                    user = it
                }
            }
        }

        val adapter = RepoAdapter(list, this@RepositoriesActivity, user)

        binding.recyclerRepos.layoutManager = linearLayoutManager
        binding.recyclerRepos.adapter = adapter

        viewModel.repos.observe(this, { response ->
            if (response.isSuccessful) {
                if (response.body() != null && response.body()!!.isNotEmpty()) {
                    list.clear()
                    list.addAll(response.body()!!)
                    adapter.notifyDataSetChanged()
                }
            } else {
                Toast.makeText(this@RepositoriesActivity, response.code().toString(), Toast.LENGTH_SHORT).show()
            }
        })

        binding.back.setOnClickListener {
            this@RepositoriesActivity.finish()
        }
    }
}