package com.example.mygithubrecord.rest;

import com.example.mygithubrecord.model.GitHubRepo;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface GitHubRepoEndPoint {
    @GET("/users/{user}/repos")

        //path variable substitution for the api endpoint .
        // in the path we change the "user" with the string user we get from getUser Method
    //Call<GitHubUser> getUser(@Path("user") String user);
    Call<List<GitHubRepo>>getRepo(@Path("user")String name);
}