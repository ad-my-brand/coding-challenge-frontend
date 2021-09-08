package com.adityaoo7.githistory.presentation.search

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.FakeDataSource
import com.adityaoo7.githistory.utils.MainCoroutineRule
import com.adityaoo7.githistory.utils.getOrAwaitValue
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.`is`
import org.junit.Before
import org.junit.Rule
import org.junit.Test

@ExperimentalCoroutinesApi
class SearchViewModelTest {
    private lateinit var dataSource: FakeDataSource
    private lateinit var viewModel: SearchViewModel

    @get:Rule
    var instantTaskExecutorRule = InstantTaskExecutorRule()

    @get:Rule
    var mainCoroutineRule = MainCoroutineRule()

    @Before
    fun setUp() {
        dataSource = FakeDataSource()
        viewModel = SearchViewModel(dataSource)
    }

    @Test
    fun givenUserName_whenOnSearchCalled_retrievesUser() {
        // Given :
        viewModel.userName.value = "anyUser"

        // When :
        viewModel.onSearch()
        val result = viewModel.user.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(dataSource.user))
    }

    @Test
    fun givenUserNameIsEmpty_whenOnSearchCalled_returnsErrorMessage() {
        // Given :
        viewModel.userName.value = ""

        // When :
        viewModel.onSearch()
        val result = viewModel.error.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(R.string.empty_field_error))
    }

    @Test
    fun givenNetworkError_whenOnSearchCalled_returnsErrorMessage() {
        // Given :
        viewModel.userName.value = "SomeUserName"
        dataSource.setShouldReturnError(true)

        // When :
        viewModel.onSearch()
        val result = viewModel.error.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(R.string.user_fetch_error))
    }

    @Test
    fun givenUserName_whenOnSearchCalled_thenLoadingBecomesTrue() {
        // Given :
        viewModel.userName.value = "SomeUser"

        // When :
        val result0 = viewModel.loading.getOrAwaitValue()

        // Then :
        assertThat(result0, `is`(false))

        // Given :
        mainCoroutineRule.pauseDispatcher()

        // When :
        viewModel.onSearch()
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
}