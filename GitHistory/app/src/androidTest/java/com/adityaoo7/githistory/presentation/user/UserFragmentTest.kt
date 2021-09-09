package com.adityaoo7.githistory.presentation.user

import androidx.fragment.app.testing.launchFragmentInContainer
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.recyclerview.widget.RecyclerView
import androidx.test.core.app.ApplicationProvider
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.contrib.RecyclerViewActions
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.MediumTest
import androidx.test.filters.SmallTest
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.TestApplication
import com.adityaoo7.githistory.data.source.FakeDataSourceAndroid
import com.adityaoo7.githistory.di.TestAppComponent
import com.adityaoo7.githistory.utils.MainCoroutineRuleAndroid
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.hamcrest.Matchers.not
import org.junit.After
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import javax.inject.Inject

@RunWith(AndroidJUnit4::class)
@MediumTest
class UserFragmentTest {

    @Inject
    lateinit var dataSource: FakeDataSourceAndroid

    @ExperimentalCoroutinesApi
    @get:Rule
    var mainCoroutineRuleAndroid = MainCoroutineRuleAndroid()

    @Before
    fun setUp() {
        val application = ApplicationProvider.getApplicationContext() as TestApplication
        val appComponent = application.appComponent as TestAppComponent
        appComponent.inject(this)
    }

    @After
    fun tearDown() {
        dataSource.setShouldReturnError(false)
        dataSource.setShouldReturnEmpty(false)
    }

    @Test
    fun givenUser_whenInitialized_thenDisplaysUserInfoAndListOfRepositories() {
        // Given :
        val bundle = UserFragmentArgs(dataSource.user).toBundle()

        // When :
        launchFragmentInContainer<UserFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.user_name_text_view)).check(matches(withText(dataSource.user.userName)))

        onView(withText(dataSource.repositories[0].name)).check(matches(isDisplayed()))
    }

    @Test
    fun givenListOfRepositories_whenAnyOneRepositoryClicked_thenNavigatesToRepositoryScreen() {
        // Given :
        val bundle = UserFragmentArgs(dataSource.user).toBundle()
        val scenario = launchFragmentInContainer<UserFragment>(bundle, R.style.Theme_GitHistory)
        val navController = mock(NavController::class.java)
        scenario.onFragment {
            Navigation.setViewNavController(it.view!!, navController)
        }

        // When :
        onView(withId(R.id.repository_list))
            .perform(
                RecyclerViewActions.actionOnItem<RecyclerView.ViewHolder>(
                    hasDescendant(withText(dataSource.repositories[0].name)), click()
                )
            )

        // Then :
        verify(navController).navigate(
            UserFragmentDirections.actionUserFragmentToRepositoryFragment(
                dataSource.repositories[0],
                dataSource.user.userName
            )
        )
    }

    @ExperimentalCoroutinesApi
    @Test
    fun givenListOfRepositories_whenInitialized_thenLoadingProgressbarIsDisplayed() {
        // Given :
        mainCoroutineRuleAndroid.pauseDispatcher()

        // When :
        val bundle = UserFragmentArgs(dataSource.user).toBundle()
        launchFragmentInContainer<UserFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.loading_repos_progress_bar)).check(matches(isDisplayed()))

        // When :
        mainCoroutineRuleAndroid.resumeDispatcher()

        // Then :
        onView(withId(R.id.loading_repos_progress_bar)).check(matches(not(isDisplayed())))
    }

    @Test
    fun givenEmptyListOfRepositories_whenInitialized_thenDisplaysNoRepositoriesFound() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        // When :
        val bundle = UserFragmentArgs(dataSource.user).toBundle()
        launchFragmentInContainer<UserFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.empty_repo_list_text_view)).check(matches(isDisplayed()))
    }

    @Test
    fun givenNetworkError_whenInitialized_thenDisplaysSnackbarWithErrorMessage() {
        // Given :
        dataSource.setShouldReturnError(true)

        // When :
        val bundle = UserFragmentArgs(dataSource.user).toBundle()
        launchFragmentInContainer<UserFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withText(R.string.repos_fetch_error)).check(matches(isDisplayed()))
    }
}