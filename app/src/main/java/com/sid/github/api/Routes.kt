package com.sid.github.api

import com.sid.github.model.Repo
import com.sid.github.model.User
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path


interface Routes {

    @GET("/users/{user}")
    fun getUserDetails(@Path("user") user: String): Call<User>

    @GET("/users/{user}/repos")
    fun getRepoDetails(@Path("user") user : String) : Call<List<Repo>>

}