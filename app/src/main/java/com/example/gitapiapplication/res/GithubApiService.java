package com.example.gitapiapplication.res;

import java.util.List;

import com.example.gitapiapplication.entities.Issue;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface GithubApiService {
    @GET("/repos/{owner}/{repo}/issues")
    Call<List<Issue>> getIssues(@Path("owner") String owner, @Path("repo") String repo);
}
