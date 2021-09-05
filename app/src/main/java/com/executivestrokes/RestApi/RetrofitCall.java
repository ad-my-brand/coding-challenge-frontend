package com.executivestrokes.RestApi;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
//Building Retrofit
public class RetrofitCall {
    public static final String Base_Url = "https://api.github.com/";
    private static Retrofit retrofit = null;

    public static Retrofit getUserInfo() {
        if (retrofit==null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(Base_Url)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
