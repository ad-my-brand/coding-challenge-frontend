package com.example.githubapp.repository

import android.app.Application
import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import com.example.githubapp.api.RetrofitInstance
import com.example.githubapp.models.issuesResponse
import com.example.githubapp.models.repositoryResponse
import com.example.githubapp.models.searchUserResponse
import retrofit2.Response

class DefaultGitHubRepository(
    val app:Application
) : GitHubRepository{

    companion object{
        const val tag="Repository"
    }

    override suspend fun searchUser(searchQuery:String, pageNumber:Int) : Response<searchUserResponse>{
        if(hasInternetConnection())
        {
            return RetrofitInstance.api.searchUsers(searchQuery,pageNumber)
        }
        throw Exception("No internet")
    }

    override suspend fun getRepos(userName:String, pageNumber:Int) : Response<repositoryResponse>{
        if(hasInternetConnection())
        {
            return RetrofitInstance.api.getRepos(userName, pageNumber = pageNumber)
        }
        throw Exception("No internet")
    }

    override suspend fun getIssues(username:String, repoName:String,pageNumber: Int) : Response<issuesResponse>{
        if(hasInternetConnection())
        {
            return RetrofitInstance.api.getIssues(username,repoName,pageNumber)
        }
        throw Exception("No internet")
    }

    private fun hasInternetConnection(): Boolean {
        // for checking the internet connectivity we need a connectivity manager which is system service which requires context and for that we need a context
        // So rather than using the activity context which gets destroyed when the activity get destroyed we use application context

        val connectivityManager = app.getSystemService(
            Context.CONNECTIVITY_SERVICE
        ) as ConnectivityManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            val activeNetwork = connectivityManager.activeNetwork ?: return false
            val capabilities =
                connectivityManager.getNetworkCapabilities(activeNetwork) ?: return false
            return when {
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> true
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> true
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> true
                else -> false
            }
        } else {
            connectivityManager.activeNetworkInfo?.run {
                return when (type) {
                    ConnectivityManager.TYPE_WIFI -> true
                    ConnectivityManager.TYPE_MOBILE -> true
                    ConnectivityManager.TYPE_ETHERNET -> true
                    else -> false
                }
            }
        }
        return false
    }
}