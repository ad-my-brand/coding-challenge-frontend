package com.example.githubapp.ui.viewModels

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.githubapp.models.issuesResponse
import com.example.githubapp.models.repositoryResponse
import com.example.githubapp.models.searchUserResponse
import com.example.githubapp.repository.GitHubRepository
import com.example.githubapp.util.Resource
import kotlinx.coroutines.launch
import retrofit2.Response
import java.io.IOException

class GitHubViewModel(
    private val repository: GitHubRepository
) : ViewModel() {

    companion object {
        const val tag = "GithubRepository"
    }

    val users = MutableLiveData<Resource<searchUserResponse>>()
    var searchUserResponse: searchUserResponse? = null
    var searchUsersPage: Int = 1

    val repos = MutableLiveData<Resource<repositoryResponse>>()
    var repositoryResponse: repositoryResponse? = null
    var reposPage: Int = 1

    val issues = MutableLiveData<Resource<issuesResponse>>()
    var issuesResponse: issuesResponse? = null
    var issuesPage: Int = 1

    fun search(searchQuery: String) {
        if(searchQuery.isNotEmpty()) {
            viewModelScope.launch {
                safeSearch(searchQuery)
            }
        }
    }

    private suspend fun safeSearch(searchQuery: String) {

        users.postValue(Resource.loading())

        try {
            val response = repository.searchUser(searchQuery, searchUsersPage)
            users.postValue(handleUserSearchResponse(response))
        } catch (t: Throwable) {
            when (t) {
                is IOException -> users.postValue(Resource.error(msg = "Network failure"))
                else -> users.postValue(Resource.error(msg = t.message ?: "Conversion error"))
            }
        }
    }

    private fun handleUserSearchResponse(response: Response<searchUserResponse>): Resource<searchUserResponse> {
        if (response.isSuccessful) {
            response.body()?.let {
                searchUsersPage++
                if (searchUserResponse == null) {
                    searchUserResponse = it
                } else {
                    Log.d(tag, "searchMore")
                    it.items?.let { it1 -> searchUserResponse?.items?.addAll(it1) }
                }
                return Resource.success(searchUserResponse ?: it)
            }
        }

        return Resource.error(msg = response.message())
    }

    fun getRepos(username: String) {
        if (username.isNotEmpty()) {
            viewModelScope.launch {
                safeGetRepos(username)
            }
        }
    }

    private suspend fun safeGetRepos(username: String) {

        repos.postValue(Resource.loading())

        try {
            val response = repository.getRepos(username, reposPage)
            repos.postValue(handleGetReposResponse(response))

        } catch (t: Throwable) {
            when (t) {
                is IOException -> repos.postValue(Resource.error(msg = "Network failure"))
                else -> users.postValue(Resource.error(msg = t.message ?: "Conversion error"))
            }
        }
    }

    private fun handleGetReposResponse(response: Response<repositoryResponse>): Resource<repositoryResponse> {
        if (response.isSuccessful) {
            response.body()?.let {
                reposPage++
                if (repositoryResponse == null) {
                    repositoryResponse = it
                } else {
                    repositoryResponse?.addAll(it)
                }
                return Resource.success(repositoryResponse ?: it)
            }
        }

        return Resource.error(msg = response.message())
    }

    fun getIssues(username: String, repoName: String) {
        if(username.isNotEmpty()&&repoName.isNotEmpty()) {
            viewModelScope.launch {
                safeGetIssues(username, repoName)
            }
        }
    }

    private suspend fun safeGetIssues(username: String, repoName: String) {

        issues.postValue(Resource.loading())

        try {
            val response = repository.getIssues(username, repoName, issuesPage)
            issues.postValue(handleGetIssuesResponse(response))
        } catch (t: Throwable) {
            when (t) {
                is IOException -> issues.postValue(Resource.error(msg = "Network failure"))
                else -> issues.postValue(Resource.error(msg = t.message ?: "Conversion error"))
            }
        }
    }

    private fun handleGetIssuesResponse(response: Response<issuesResponse>): Resource<issuesResponse> {
        if (response.isSuccessful) {
            response.body()?.let {
                issuesPage++
                if (issuesResponse == null) {
                    issuesResponse = it
                } else {
                    issuesResponse?.addAll(it)
                }
                return Resource.success(issuesResponse ?: it)
            }
        }

        return Resource.error(msg = response.message())
    }

}