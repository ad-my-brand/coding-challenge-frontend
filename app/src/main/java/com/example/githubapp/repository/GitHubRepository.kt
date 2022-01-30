package com.example.githubapp.repository

import android.util.Log
import com.example.githubapp.api.RetrofitInstance
import com.example.githubapp.models.issuesResponse
import com.example.githubapp.models.repositoryResponse
import com.example.githubapp.models.searchUserResponse
import retrofit2.Response

interface GitHubRepository {

    suspend fun searchUser(searchQuery: String, pageNumber: Int): Response<searchUserResponse>

    suspend fun getRepos(userName: String, pageNumber: Int): Response<repositoryResponse>

    suspend fun getIssues(username: String, repoName: String,pageNumber: Int): Response<issuesResponse>
}