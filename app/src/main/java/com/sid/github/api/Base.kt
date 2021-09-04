package com.sid.github.api

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class Base {

    val BASE_URL = "https://api.github.com/"
    var retrofit: Retrofit? = null

    fun getClient(): Retrofit? {
        if (retrofit == null) {
            retrofit = Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()
        }
        return retrofit
    }

}