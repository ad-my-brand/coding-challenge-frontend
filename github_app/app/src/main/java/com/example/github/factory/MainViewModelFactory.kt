package com.example.github.factory

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.github.repositories.MainActivityRepository
import com.example.github.viewModels.MainViewModel
import java.lang.IllegalArgumentException

class MainViewModelFactory(private val repository: MainActivityRepository)
    : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
            return MainViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown Argument")
    }

}