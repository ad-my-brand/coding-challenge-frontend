package com.executivestrokes.RestApi;

import com.executivestrokes.model.UserModel;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface UserInterface {
    @GET("/users/{user}")
    Call<UserModel> getUser(@Path("user") String user);

}
