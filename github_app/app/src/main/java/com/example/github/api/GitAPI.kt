package com.example.github.api

import com.example.github.models.Issue
import com.example.github.models.Repository
import com.example.github.models.User
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface GitAPI {

    @GET("users/{userName}")
    suspend fun getUser(@Path("userName") userName: String): Response<User>

    @GET("users/{userName}/repos")
    suspend fun getRepos(@Path("userName") userName: String): Response<List<Repository>>

    @GET("repos/{userName}/{repoName}/issues")
    suspend fun getIssues(@Path("userName") userName: String, @Path("repoName") repoName: String)
    : Response<List<Issue>>

}