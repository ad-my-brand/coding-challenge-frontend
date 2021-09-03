package com.example.github.repositories

import com.example.github.api.RetrofitInstance
import com.example.github.models.Issue
import retrofit2.Response

class IssuesRepositories {
    private val retrofitInstance = RetrofitInstance

    suspend fun getIssues(args: String, args2: String): Response<List<Issue>> {
        return retrofitInstance.api.getIssues(args, args2)
    }
}