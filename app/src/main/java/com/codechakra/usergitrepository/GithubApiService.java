package com.codechakra.usergitrepository;

import com.codechakra.usergitrepository.models.Issue;
import com.codechakra.usergitrepository.models.Repos;
import com.codechakra.usergitrepository.models.Users;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface GithubApiService {
    @GET("users/{login}")
    Call<Users> getUserHistory(@Path("login") String login );

  @GET("users/{login}/repos")
    Call<List<Repos>> getUserRepo(@Path("login") String login);
    //https://api.github.com/repos/octocat/Hello-World/issues{/number}

    @GET("repos/{login}/{reponame}/issues/{number}")
    Call<Issue> getRepoIssue(@Path("login") String login,
                             @Path("reponame") String reponame,
                             @Path("number") String number
                            );
    //octocat/Spoon-Knife/issues
}
