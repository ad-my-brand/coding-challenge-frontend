package com.executivestrokes.RestApi;

import com.executivestrokes.model.IssueModel;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface IssueInterface {
    @GET("/repos/{owner}/{repo}/issues")
    Call<List<IssueModel>> getIssues(@Path("owner") String owner, @Path("repo") String repo);
}
