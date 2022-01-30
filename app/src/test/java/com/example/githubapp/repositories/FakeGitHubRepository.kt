package com.example.githubapp.repositories

import com.example.githubapp.models.issuesResponse
import com.example.githubapp.models.repositoryResponse
import com.example.githubapp.models.repositoryResponseItem
import com.example.githubapp.models.searchUserResponse
import com.example.githubapp.repository.GitHubRepository
import retrofit2.Response

class FakeGitHubRepository : GitHubRepository {

    private var hasNetworkError = false

    fun setHasNetworkError(value: Boolean) {
        hasNetworkError = value
    }

    override suspend fun searchUser(
        searchQuery: String,
        pageNumber: Int
    ): Response<searchUserResponse> {
        return if (!hasNetworkError)
            Response.success(searchUserResponse(false, mutableListOf(), 0))
        else
            throw Exception("No internet")
    }

    override suspend fun getRepos(userName: String, pageNumber: Int): Response<repositoryResponse> {
        return if (!hasNetworkError)
            Response.success(repositoryResponse())
        else
            throw Exception("No internet")
    }

    override suspend fun getIssues(username: String, repoName: String,pageNumber: Int): Response<issuesResponse> {
        return if (!hasNetworkError)
            Response.success(issuesResponse())
        else
            throw Exception("No internet")
    }
}