package com.example.github.viewModels

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.github.models.Issue
import com.example.github.repositories.IssuesRepositories
import kotlinx.coroutines.launch
import retrofit2.Response

class IssuesViewModel(private val repository: IssuesRepositories): ViewModel() {
    var issue: MutableLiveData<Response<List<Issue>>> = MutableLiveData()

    fun getIssues(userName: String, repoName: String) {
        viewModelScope.launch {
            val response: Response<List<Issue>> = repository.getIssues(userName, repoName)
            issue.value = response
        }
    }
}