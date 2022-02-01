package com.android.Api;

import com.android.model.UserModel;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface UserInterface {
    @GET("/users/{user}")
    Call<UserModel> getUser(@Path("user") String user);

}
