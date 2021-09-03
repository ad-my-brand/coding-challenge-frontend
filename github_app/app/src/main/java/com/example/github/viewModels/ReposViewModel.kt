package com.example.github.viewModels

import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.github.models.Repository
import com.example.github.repositories.ReposRepository
import kotlinx.coroutines.launch
import retrofit2.Response

class ReposViewModel(private val repository: ReposRepository): ViewModel() {
    var repos: MutableLiveData<Response<List<Repository>>> = MutableLiveData()

    fun getRepos(userName: String) {
        viewModelScope.launch {
            val response: Response<List<Repository>> = repository.getRepositories(userName)
            repos.value = response
        }
    }
}