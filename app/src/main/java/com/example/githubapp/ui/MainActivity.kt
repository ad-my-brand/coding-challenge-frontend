package com.example.githubapp.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.example.githubapp.databinding.ActivityMainBinding
import com.example.githubapp.repository.DefaultGitHubRepository
import com.example.githubapp.repository.GitHubRepository
import com.example.githubapp.ui.viewModels.GitHubViewModel
import com.example.githubapp.ui.viewModels.GitHubViewModelFactory

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    lateinit var viewModel:GitHubViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val repository=DefaultGitHubRepository(application)
        val viewModelProviderFactory=GitHubViewModelFactory(repository as GitHubRepository)
        viewModel= ViewModelProvider(this,viewModelProviderFactory)[GitHubViewModel::class.java]
        binding= ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

    }
}