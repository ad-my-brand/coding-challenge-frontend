package com.adityaoo7.githistory.network

import com.adityaoo7.githistory.models.Comment
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.models.User
import retrofit2.http.GET
import retrofit2.http.Path

const val BASE_URL = "https://api.github.com/"

interface GithubApiService {
    @GET("users/{user}")
    suspend fun getUser(@Path("user") userName: String): User?

    @GET("repos/{user}/{repo}")
    suspend fun getRepository(
        @Path("user") userName: String,
        @Path("repo") repoName: String
    ): Repository?

    @GET("users/{user}/repos")
    suspend fun getRepositories(@Path("user") userName: String): List<Repository>?

    @GET("repos/{user}/{repo}/issues/{number}")
    suspend fun getIssue(
        @Path("user") userName: String,
        @Path("repo") repoName: String,
        @Path("number") issueNumber: Int
    ): Issue?

    @GET("repos/{user}/{repo}/issues")
    suspend fun getIssues(
        @Path("user") userName: String,
        @Path("repo") repoName: String
    ): List<Issue>?

    @GET("repos/{user}/{repo}/issues/{number}/comments")
    suspend fun getComments(
        @Path("user") userName: String,
        @Path("repo") repoName: String,
        @Path("number") issueNumber: Int
    ): List<Comment>?
}