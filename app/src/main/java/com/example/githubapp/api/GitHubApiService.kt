package com.example.githubapp.api

import com.example.githubapp.models.issuesResponse
import com.example.githubapp.models.repositoryResponse
import com.example.githubapp.models.searchUserResponse
import com.example.githubapp.ui.fragments.IssuesFragment
import com.example.githubapp.util.Constants.Companion.DEFAULT_ITEMS_PER_PAGE
import com.example.githubapp.util.Constants.Companion.DEFAULT_PAGE_NUMBER
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface GitHubApiService {

    @GET("/search/users")
    suspend fun searchUsers(
        @Query("q")
        searchQuery: String,
        @Query("page")
        pageNumber:Int?= DEFAULT_PAGE_NUMBER,
        @Query("per_page")
        itemsPerPage:Int?= DEFAULT_ITEMS_PER_PAGE
    ) : Response<searchUserResponse>

    @GET("users/{username}/repos")
    suspend fun getRepos(
        @Path("username")
        username:String,
        @Query("per_page")
        itemsPerPage:Int?= DEFAULT_ITEMS_PER_PAGE,
        @Query("page")
        pageNumber:Int?= DEFAULT_PAGE_NUMBER
    ) : Response<repositoryResponse>

    @GET("repos/{username}/{repoName}/issues")
    suspend fun getIssues(
        @Path("username")
        username:String,
        @Path("repoName")
        repoName:String,
        @Query("page")
        pageNumber:Int?= DEFAULT_PAGE_NUMBER,
        @Query("per_page")
        itemsPerPage:Int?= DEFAULT_ITEMS_PER_PAGE
    ) : Response<issuesResponse>
}