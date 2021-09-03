package com.example.github.factory

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.github.repositories.ReposRepository
import com.example.github.viewModels.ReposViewModel

class ReposViewModelFactory(private val repository: ReposRepository)
    : ViewModelProvider.Factory{

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(ReposViewModel::class.java)) {
            return ReposViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown Argument")
    }
}