package com.adityaoo7.githistory

import androidx.annotation.VisibleForTesting
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.data.source.RemoteDataSource
import com.adityaoo7.githistory.network.BASE_URL
import com.adityaoo7.githistory.network.GithubApiService
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

/**
 * Service locator is single source Dependency provider. It is singleton class object
 */
object ServiceLocator {

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val retrofit: Retrofit? = null

    @Volatile
    var dataSource: IDataSource? = null
        @VisibleForTesting set

    /**
     * Returns single instance of data source (which implements [IDataSource]) in thread safe manner.
     * @return instance of data source which implements [IDataSource]
     */
    fun provideDataSource(): IDataSource {
        synchronized(this) {
            return dataSource ?: createDataSource()
        }
    }

    private fun createDataSource(): IDataSource {
        val newDataSource = RemoteDataSource(createApiService())
        dataSource = newDataSource

        return newDataSource
    }

    private fun createApiService(): GithubApiService {
        val api: Retrofit = retrofit ?: Retrofit.Builder()
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .baseUrl(BASE_URL)
            .build()
        return api.create(GithubApiService::class.java)
    }
}