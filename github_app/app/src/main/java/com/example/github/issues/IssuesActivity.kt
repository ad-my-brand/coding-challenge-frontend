package com.example.github.issues

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.github.R
import com.example.github.adapter.IssuesAdapter
import com.example.github.databinding.ActivityIssuesBinding
import com.example.github.factory.IssuesViewModelFactory
import com.example.github.models.Issue
import com.example.github.repositories.IssuesRepositories
import com.example.github.viewModels.IssuesViewModel

class IssuesActivity : AppCompatActivity() {
    private lateinit var binding: ActivityIssuesBinding
    private lateinit var viewModel: IssuesViewModel

    private var list = ArrayList<Issue>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityIssuesBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val repository = IssuesRepositories()
        val viewModelFactory = IssuesViewModelFactory(repository)
        viewModel = ViewModelProvider(this, viewModelFactory).get(IssuesViewModel::class.java)

    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onStart() {
        super.onStart()

        val linearLayoutManager = LinearLayoutManager(
            this@IssuesActivity,
            LinearLayoutManager.VERTICAL,
            false
        )

        var dir = ""
        val intent = intent
        if (intent != null) {
            if (intent.hasExtra("dir")) {
                dir = intent.getStringExtra("dir").toString()
            }

            if (intent.hasExtra("name") && intent.hasExtra("repo")) {

                viewModel.getIssues(
                    intent.getStringExtra("name")!!,
                    intent.getStringExtra("repo")!!
                )

                binding.repoName.text = intent.getStringExtra("repo")
            }
        }

        val adapter = IssuesAdapter(list, this@IssuesActivity, dir)
        binding.recyclerIssues.layoutManager = linearLayoutManager
        binding.recyclerIssues.adapter = adapter

        viewModel.issue.observe(this, { response ->
            if (response.isSuccessful) {
                if (response.body() != null && response.body()!!.isNotEmpty()) {
                    list.clear()
                    list.addAll(response.body()!!)
                    adapter.notifyDataSetChanged()
                }
            } else {
                Toast.makeText(this@IssuesActivity, response.code().toString(), Toast.LENGTH_SHORT).show()
            }
        })

        binding.back.setOnClickListener {
            this@IssuesActivity.finish()
        }
    }
}