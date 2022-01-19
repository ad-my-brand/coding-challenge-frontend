package com.android.androidcoroutinedemokotlin.network

import com.android.androidcoroutinedemokotlin.models.RecyclerData
import com.android.androidcoroutinedemokotlin.models.RecyclerList
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query
interface RetroService {


    @GET("search/users")
   fun getDataFromApi(@Query("q") query : String): Call<RecyclerList>



   @GET("users/{username}/repos")
    fun getUserRepo(
        @Path("username") username: String?
    ):  Call<ArrayList<RecyclerData>>



    @GET("repos/{username}/{reponame}/issues")
    fun getUserIssue(
        @Path("username") username: String?,@Path("reponame") reponame:String?
    ):  Call<ArrayList<RecyclerData>>


}