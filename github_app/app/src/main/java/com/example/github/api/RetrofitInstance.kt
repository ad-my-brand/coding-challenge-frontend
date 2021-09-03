package com.example.github.api

import com.example.github.BuildConfig
import retrofit2.Retrofit
import com.example.github.api.Link.Companion.git_url
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitInstance {
    private val retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(git_url)
            .addConverterFactory(GsonConverterFactory.create())
            .client(getLogInterceptor())
            .build()
    }

    val api: GitAPI by lazy {
        retrofit.create(GitAPI::class.java)
    }

    private fun getLogInterceptor(): OkHttpClient {
        val clientBuilder: OkHttpClient.Builder = OkHttpClient.Builder()

        if (BuildConfig.DEBUG) {
            val interceptor = HttpLoggingInterceptor()
            interceptor.setLevel(HttpLoggingInterceptor.Level.BASIC)
            clientBuilder.addInterceptor(interceptor)
        }

        return clientBuilder.build()
    }
}