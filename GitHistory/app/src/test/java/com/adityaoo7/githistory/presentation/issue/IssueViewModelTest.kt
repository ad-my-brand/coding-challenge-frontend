package com.adityaoo7.githistory.presentation.issue

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.FakeDataSource
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.utils.MainCoroutineRule
import com.adityaoo7.githistory.utils.getOrAwaitValue
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.`is`
import org.junit.Before
import org.junit.Rule
import org.junit.Test

@ExperimentalCoroutinesApi
class IssueViewModelTest {
    private lateinit var dataSource: FakeDataSource
    private lateinit var viewModel: IssueViewModel

    private lateinit var issue: Issue
    private val userName = "SomeUser"
    private val repoName = "SomeRepo"

    @get:Rule
    var instantTaskExecutorRule = InstantTaskExecutorRule()

    @get:Rule
    var mainCoroutineRule = MainCoroutineRule()

    @Before
    fun setUp() {
        dataSource = FakeDataSource()

        issue = dataSource.issues[0]
    }

    @Test
    fun givenIssue_whenModelInitialized_thenRetrievesComments() {
        // When :
        viewModel = IssueViewModel(dataSource, issue, userName, repoName)
        val result = viewModel.comments.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(dataSource.comments))
    }

    @Test
    fun givenNetworkError_whenModelInitialized_thenReturnsErrorMessage() {
        // Given :
        dataSource.setShouldReturnError(true)

        // When :
        viewModel = IssueViewModel(dataSource, issue, userName, repoName)
        val result = viewModel.error.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(R.string.comments_fetch_error))
    }

    @Test
    fun givenIssue_whenModelInitialized_thenLoadingBecomesTrue() {
        // Given :
        mainCoroutineRule.pauseDispatcher()

        // When :
        viewModel = IssueViewModel(dataSource, issue, userName, repoName)
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
    fun givenEmptyListOfComments_whenModelInitialized_thenEmptyBecomesTrue() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        // When :
        viewModel = IssueViewModel(dataSource, issue, userName, repoName)
        val result = viewModel.empty.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(true))
    }

    @Test
    fun givenNewIssuesAdded_whenRefreshCalled_thenRetrievesLatestIssues() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        // When :
        viewModel = IssueViewModel(dataSource, issue, userName, repoName)
        val result0 = viewModel.empty.getOrAwaitValue()

        // Then :
        assertThat(result0, `is`(true))

        // When :
        val result1 = viewModel.comments.getOrAwaitValue()

        // Then :
        assertThat(result1, `is`(emptyList()))

        // Given :
        dataSource.setShouldReturnEmpty(false)

        // When :
        viewModel.refresh()
        val result2 = viewModel.comments.getOrAwaitValue()

        // Then :
        assertThat(result2, `is`(dataSource.comments))
    }
}