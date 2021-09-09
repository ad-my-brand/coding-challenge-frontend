package com.adityaoo7.githistory.di

import com.adityaoo7.githistory.presentation.issue.IssueFragment
import com.adityaoo7.githistory.presentation.repository.RepositoryFragment
import com.adityaoo7.githistory.presentation.search.SearchFragment
import com.adityaoo7.githistory.presentation.user.UserFragment
import dagger.Component
import javax.inject.Singleton

@Singleton
@Component(modules = [IDataSourceModule::class, NetworkModule::class])
interface AppComponent {

    @Component.Factory
    interface Factory {
        fun create(): AppComponent
    }

    fun inject(fragment: SearchFragment)
    fun inject(fragment: UserFragment)
    fun inject(fragment: RepositoryFragment)
    fun inject(fragment: IssueFragment)
}