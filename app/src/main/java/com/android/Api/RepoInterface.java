package com.android.Api;

import com.android.model.RepoModel;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface RepoInterface {
    @GET("/users/{user}/repos")
    Call<List<RepoModel>> getRepo(@Path("user") String user);

}
