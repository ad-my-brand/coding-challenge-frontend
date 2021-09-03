package com.example.github

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.SearchView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.view.isVisible
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.example.github.databinding.ActivityMainBinding
import com.example.github.factory.MainViewModelFactory
import com.example.github.models.User
import com.example.github.repos.RepositoriesActivity
import com.example.github.repositories.MainActivityRepository
import com.example.github.viewModels.MainViewModel

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var viewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)

        val repository = MainActivityRepository()
        val viewModelFactory = MainViewModelFactory(repository)
        viewModel = ViewModelProvider(this, viewModelFactory).get(MainViewModel::class.java)

    }

    override fun onStart() {
        super.onStart()

        viewModel.user.observe(this, { response ->
            if (response.isSuccessful) {
                if (response.body() != null) {
                    fillUserProfile(response.body()!!)
                }
            } else {
                Toast.makeText(this@MainActivity, response.code().toString(), Toast.LENGTH_SHORT).show()
            }
            binding.progressCircular.isVisible = false
        })

        binding.search.setOnQueryTextListener(object : SearchView.OnQueryTextListener,
            androidx.appcompat.widget.SearchView.OnQueryTextListener {
            @RequiresApi(Build.VERSION_CODES.M)
            override fun onQueryTextSubmit(query: String?): Boolean {
                if (query != null) {
                    if (query.isNotEmpty()) {
                        binding.progressCircular.isVisible = true
                        viewModel.getUser(query)
                    }
                }
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                return false
            }
        })

    }

    @SuppressLint("SetTextI18n")
    private fun fillUserProfile(body: User) {

        binding.info.isVisible = true
        binding.controls.isVisible = true

        Glide.with(this@MainActivity)
            .load("https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png")
            .into(binding.profileImage)

        if (body.name != null) {
            binding.name.text = body.name
        }

        if (body.login != null) {
            binding.username.text = body.login
        }

        if (body.company != null) {
            binding.job.isVisible = true
            binding.jobLogo.isVisible = true

            binding.job.text = body.name
        }

        if (body.location != null) {
            binding.locationImage.isVisible = true
            binding.location.isVisible = true

            binding.location.text = body.location
        }

        if (body.followers != 0) {
            binding.followers.text = "${body.followers} followers"
        }

        if (body.following != 0) {
            binding.followings.text = "${body.following} followings"
        }

        if (body.public_repos != 0) {
            binding.reposCount.text = body.public_repos.toString()

            binding.repo.setOnClickListener {
                val intent = Intent(this@MainActivity, RepositoriesActivity::class.java)
                intent.putExtra("user_name", body.login)
                startActivity(intent)
            }
        }

    }
}