package com.example.githistoryapp

import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Url
import user


interface apiInterface {
    @GET
    fun getUser(
        @Url url:String
    ):Call<user>
    @GET
    fun getrepo(
        @Url url:String
    ):Call<List<repoItem>>
    @GET
    fun getcommit(
        @Url url:String
    ):Call<List<commitItem>>

}