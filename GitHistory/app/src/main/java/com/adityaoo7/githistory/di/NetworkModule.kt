package com.adityaoo7.githistory.di

import com.adityaoo7.githistory.network.BASE_URL
import com.adityaoo7.githistory.network.GithubApiService
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import dagger.Module
import dagger.Provides
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

@Module
class NetworkModule {

    @Provides
    fun provideGithubApiService(): GithubApiService {

        val moshi = Moshi.Builder()
            .add(KotlinJsonAdapterFactory())
            .build()

        return Retrofit.Builder()
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .baseUrl(BASE_URL)
            .build()
            .create(GithubApiService::class.java)
    }

    @Provides
    fun provideDispatcher(): CoroutineDispatcher = Dispatchers.IO
}