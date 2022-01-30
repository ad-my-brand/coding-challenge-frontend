package com.example.githubapp.ui.viewModels

import androidx.lifecycle.*
import com.example.githubapp.repository.GitHubRepository

class GitHubViewModelFactory(
    private val repository: GitHubRepository
) : ViewModelProvider.Factory{
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return GitHubViewModel(repository) as T
    }

}