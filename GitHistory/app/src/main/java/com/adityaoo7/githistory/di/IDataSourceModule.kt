package com.adityaoo7.githistory.di

import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.data.source.RemoteDataSource
import dagger.Binds
import dagger.Module

@Module
abstract class IDataSourceModule {

    @Binds
    abstract fun provideDataSource(dataSource: RemoteDataSource): IDataSource
}