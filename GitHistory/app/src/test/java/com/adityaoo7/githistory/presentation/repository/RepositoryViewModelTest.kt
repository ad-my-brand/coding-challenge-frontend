package com.adityaoo7.githistory.presentation.repository

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.FakeDataSource
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.utils.MainCoroutineRule
import com.adityaoo7.githistory.utils.getOrAwaitValue
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.`is`
import org.hamcrest.Matchers.nullValue
import org.junit.Before
import org.junit.Rule
import org.junit.Test

@ExperimentalCoroutinesApi
class RepositoryViewModelTest {
    private lateinit var dataSource: FakeDataSource
    private lateinit var viewModel: RepositoryViewModel

    private lateinit var repository: Repository
    private val userName = "SomeUser"

    @get:Rule
    var instantTaskExecutorRule = InstantTaskExecutorRule()

    @get:Rule
    var mainCoroutineRule = MainCoroutineRule()

    @Before
    fun setUp() {
        dataSource = FakeDataSource()

        repository = dataSource.repositories[0]
    }

    @Test
    fun givenRepository_whenModelInitialized_thenRetrievesIssues() {
        // When :
        viewModel = RepositoryViewModel(dataSource, repository, userName)
        val result = viewModel.issues.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(dataSource.issues))
    }

    @Test
    fun givenNetworkError_whenModelInitialized_thenReturnsErrorMessage() {
        // Given :
        dataSource.setShouldReturnError(true)

        // When :
        viewModel = RepositoryViewModel(dataSource, repository, userName)
        val result = viewModel.error.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(R.string.issues_fetch_error))
    }

    @Test
    fun givenRepository_whenModelInitialized_thenLoadingBecomesTrue() {
        // Given :
        mainCoroutineRule.pauseDispatcher()

        // When :
        viewModel = RepositoryViewModel(dataSource, repository, userName)
        val result1 = viewModel.loading.getOrAwaitValue()

        // Then :
        assertThat(result1, `is`(true))

        // Given :
        mainCoroutineRule.resumeDispatcher()

        // When :
        val result2 = viewModel.loading.getOrAwaitValue()

        // Then :
        assertThat(result2, `is`(false))
    }

    @Test
    fun givenEmptyListOfIssues_whenModelInitialized_thenEmptyBecomesTrue() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        // When :
        viewModel = RepositoryViewModel(dataSource, repository, userName)
        val result = viewModel.empty.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(true))
    }

    @Test
    fun givenIssues_whenNavigateToIssueScreenCalledWithIssue_thenSetsNavigateToIssueToSameIssue() {
        // Given :
        viewModel = RepositoryViewModel(dataSource, repository, userName)

        // When :
        viewModel.navigateToIssueScreen(dataSource.issues[0])
        val result = viewModel.navigateToIssue.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(dataSource.issues[0]))
    }

    @Test
    fun givenNavigateToIssueHaveSomeValue_whenDoneNavigatingCalled_thenNavigateToIssueBecomesNull() {
        // Given :
        viewModel = RepositoryViewModel(dataSource, repository, userName)
        viewModel.navigateToIssueScreen(dataSource.issues[0])

        // When :
        viewModel.doneNavigating()
        val result = viewModel.navigateToIssue.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(nullValue()))
    }

    @Test
    fun givenNewIssuesAdded_whenRefreshCalled_thenRetrievesLatestIssues() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        // When :
        viewModel = RepositoryViewModel(dataSource, repository, userName)
        val result0 = viewModel.empty.getOrAwaitValue()

        // Then :
        assertThat(result0, `is`(true))

        // When :
        val result1 = viewModel.issues.getOrAwaitValue()

        // Then :
        assertThat(result1, `is`(emptyList()))

        // Given :
        dataSource.setShouldReturnEmpty(false)

        // When :
        viewModel.refresh()
        val result2 = viewModel.issues.getOrAwaitValue()

        // Then :
        assertThat(result2, `is`(dataSource.issues))
    }
}