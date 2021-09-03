package com.example.github.factory

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.github.repositories.IssuesRepositories
import com.example.github.viewModels.IssuesViewModel

class IssuesViewModelFactory(private val repository: IssuesRepositories)
    : ViewModelProvider.Factory{

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(IssuesViewModel::class.java)) {
            return IssuesViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown Argument")
    }
}