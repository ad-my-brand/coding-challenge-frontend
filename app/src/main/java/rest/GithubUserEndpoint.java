package rest;

import model.GithubUsers;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

//this is an interface
public interface GithubUserEndpoint {
    @GET("/users/{user}")
    Call<GithubUsers> getUser(@Path("user") String user);
}
