package com.adityaoo7.githistory.di

import com.adityaoo7.githistory.AppNavigationTest
import com.adityaoo7.githistory.presentation.issue.IssueFragmentTest
import com.adityaoo7.githistory.presentation.repository.RepositoryFragmentTest
import com.adityaoo7.githistory.presentation.search.SearchFragmentTest
import com.adityaoo7.githistory.presentation.user.UserFragmentTest
import dagger.Component
import javax.inject.Singleton

@Singleton
@Component(modules = [TestIDataSourceModule::class])
interface TestAppComponent : AppComponent {

    fun inject(fragment: SearchFragmentTest)
    fun inject(fragment: UserFragmentTest)
    fun inject(fragment: RepositoryFragmentTest)
    fun inject(fragment: IssueFragmentTest)
    fun inject(navigation: AppNavigationTest)
}