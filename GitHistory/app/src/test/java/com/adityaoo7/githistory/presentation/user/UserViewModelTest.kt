package com.adityaoo7.githistory.presentation.user

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.FakeDataSource
import com.adityaoo7.githistory.models.User
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
class UserViewModelTest {
    private lateinit var dataSource: FakeDataSource
    private lateinit var viewModel: UserViewModel

    private lateinit var user: User

    @get:Rule
    var instantTaskExecutorRule = InstantTaskExecutorRule()

    @get:Rule
    var mainCoroutineRule = MainCoroutineRule()

    @Before
    fun setUp() {
        dataSource = FakeDataSource()

        user = dataSource.user
    }

    @Test
    fun givenUser_whenModelInitialized_thenRetrievesRepositories() {
        // When :
        viewModel = UserViewModel(dataSource, user)
        val result = viewModel.repositories.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(dataSource.repositories))
    }

    @Test
    fun givenNetworkError_whenModelInitialized_thenReturnsErrorMessage() {
        // Given :
        dataSource.setShouldReturnError(true)

        // When :
        viewModel = UserViewModel(dataSource, user)
        val result = viewModel.error.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(R.string.repos_fetch_error))
    }

    @Test
    fun givenUser_whenModelInitialized_thenLoadingBecomesTrue() {
        // Given :
        mainCoroutineRule.pauseDispatcher()

        // When :
        viewModel = UserViewModel(dataSource, user)
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
    fun givenEmptyListOfRepositories_whenModelInitialized_thenEmptyBecomesTrue() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        // When :
        viewModel = UserViewModel(dataSource, user)
        val result = viewModel.empty.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(true))
    }

    @Test
    fun givenRepositories_whenNavigateToRepositoryScreenCalledWithRepository_thenSetsNavigateToRepositoryToSameRepository() {
        // Given :
        viewModel = UserViewModel(dataSource, user)

        // When :
        viewModel.navigateToRepositoryScreen(dataSource.repositories[0])
        val result = viewModel.navigateToRepository.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(dataSource.repositories[0]))
    }

    @Test
    fun givenNavigateToRepositoryHaveSomeValue_whenDoneNavigatingCalled_thenNavigateToRepositoryBecomesNull() {
        // Given :
        viewModel = UserViewModel(dataSource, user)
        viewModel.navigateToRepositoryScreen(dataSource.repositories[0])

        // When :
        viewModel.doneNavigating()
        val result = viewModel.navigateToRepository.getOrAwaitValue()

        // Then :
        assertThat(result, `is`(nullValue()))
    }

    @Test
    fun givenNewRepositoriesAdded_whenRefreshCalled_thenRetrievesLatestRepositories() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        // When :
        viewModel = UserViewModel(dataSource, user)
        val result0 = viewModel.empty.getOrAwaitValue()

        // Then :
        assertThat(result0, `is`(true))

        // When :
        val result1 = viewModel.repositories.getOrAwaitValue()

        // Then :
        assertThat(result1, `is`(emptyList()))

        // Given :
        dataSource.setShouldReturnEmpty(false)

        // When :
        viewModel.refresh()
        val result2 = viewModel.repositories.getOrAwaitValue()

        // Then :
        assertThat(result2, `is`(dataSource.repositories))
    }
}