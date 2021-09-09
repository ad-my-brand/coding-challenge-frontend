package rest;

import java.util.List;

import model.GitHubRepo;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface GitHubRepoEndpoint {
    @GET("/users/{users}/repos")
    Call<List<GitHubRepo>> getRepo(@Path("user")String name);
}
