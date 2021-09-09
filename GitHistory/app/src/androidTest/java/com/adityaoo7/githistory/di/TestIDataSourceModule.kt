package com.adityaoo7.githistory.di

import com.adityaoo7.githistory.data.source.FakeDataSourceAndroid
import com.adityaoo7.githistory.data.source.IDataSource
import dagger.Binds
import dagger.Module

@Module
abstract class TestIDataSourceModule {

    @Binds
    abstract fun provideDataSource(dataSource: FakeDataSourceAndroid): IDataSource
}