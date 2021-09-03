package com.example.github.repositories

import com.example.github.api.RetrofitInstance
import com.example.github.models.Repository
import retrofit2.Response

class ReposRepository {
    private val retrofitInstance = RetrofitInstance

    suspend fun getRepositories(args: String): Response<List<Repository>> {
        return retrofitInstance.api.getRepos(args)
    }
}