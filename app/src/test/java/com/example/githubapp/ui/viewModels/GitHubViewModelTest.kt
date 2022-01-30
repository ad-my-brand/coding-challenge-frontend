package com.example.githubapp.ui.viewModels

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.example.githubapp.MainCoroutineRule
import com.example.githubapp.getOrAwaitValue
import com.example.githubapp.repositories.FakeGitHubRepository
import com.example.githubapp.util.Status
import com.google.common.truth.Truth.assertThat
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.junit.Before
import org.junit.Rule
import org.junit.Test

@ExperimentalCoroutinesApi
class GitHubViewModelTest{

    @get:Rule
    var instantTaskExecutorRule=InstantTaskExecutorRule()

    @get:Rule
    var mainCoroutineRule=MainCoroutineRule()

    private lateinit var viewModel: GitHubViewModel
    private lateinit var repository: FakeGitHubRepository

    @Before
    fun setUp(){
        repository= FakeGitHubRepository()
        viewModel= GitHubViewModel(repository)
    }

    @Test
    fun noNetworkSearchUser(){
        repository.setHasNetworkError(true)
        viewModel.search("Name")

        val value=viewModel.users.getOrAwaitValue()
        assertThat(value.status).isEqualTo(Status.ERROR)
    }

    @Test
    fun networkSearchUser(){
        repository.setHasNetworkError(false)
        viewModel.search("Name")

        val value=viewModel.users.getOrAwaitValue()
        assertThat(value.status).isEqualTo(Status.SUCCESS)
    }

    @Test
    fun searchPaginationCheck(){
        repository.setHasNetworkError(false)
        val initialPage=viewModel.searchUsersPage
        viewModel.search("Name")
        val finalPage=viewModel.searchUsersPage

        assertThat(finalPage).isEqualTo(initialPage+1)
    }

    @Test
    fun `empty searchQuery leads to no search`(){
        viewModel.search("")

        assertThat(viewModel.searchUserResponse).isNull()
    }

    @Test
    fun `non empty searchQuery leads to search`(){
        viewModel.search("Name")

        assertThat(viewModel.searchUserResponse).isNotNull()
    }


    @Test
    fun noNetworkGetRepo(){
        repository.setHasNetworkError(true)
        viewModel.getRepos("Name")

        val value=viewModel.users.getOrAwaitValue()
        assertThat(value.status).isEqualTo(Status.ERROR)
    }

    @Test
    fun networkGetRepo(){
        repository.setHasNetworkError(false)
        viewModel.getRepos("Name")

        val value=viewModel.repos.getOrAwaitValue()
        assertThat(value.status).isEqualTo(Status.SUCCESS)
    }

    @Test
    fun reposPaginationCheck(){
        repository.setHasNetworkError(false)
        val initialPage=viewModel.reposPage
        viewModel.getRepos("Name")
        val finalPage=viewModel.reposPage

        assertThat(finalPage).isEqualTo(initialPage+1)
    }

    @Test
    fun `empty repo leads to no result`(){
        viewModel.getRepos("")

        assertThat(viewModel.repositoryResponse).isNull()
    }

    @Test
    fun `non empty repos leads to result`(){
        viewModel.getRepos("Name")

        assertThat(viewModel.repositoryResponse).isNotNull()
    }

    @Test
    fun noNetworkGetIssues(){
        repository.setHasNetworkError(true)
        viewModel.getIssues("Name","Repo")

        val value=viewModel.issues.getOrAwaitValue()
        assertThat(value.status).isEqualTo(Status.ERROR)
    }

    @Test
    fun networkGetIssues(){
        repository.setHasNetworkError(false)
        viewModel.getIssues("Name","Repo")

        val value=viewModel.issues.getOrAwaitValue()
        assertThat(value.status).isEqualTo(Status.SUCCESS)
    }

    @Test
    fun issuesPaginationCheck(){
        repository.setHasNetworkError(false)
        val initialPage=viewModel.issuesPage
        viewModel.getIssues("Name","Repo")
        val finalPage=viewModel.issuesPage

        assertThat(finalPage).isEqualTo(initialPage+1)
    }

    @Test
    fun `empty issue leads to no result`(){
        viewModel.getIssues("","repo")

        assertThat(viewModel.issuesResponse).isNull()
    }

    @Test
    fun `non empty issue leads to result`(){
        viewModel.getIssues("Name","repo")

        assertThat(viewModel.issuesResponse).isNotNull()
    }


}