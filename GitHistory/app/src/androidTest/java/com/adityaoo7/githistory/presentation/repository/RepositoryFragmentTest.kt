package com.adityaoo7.githistory.presentation.repository

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
class RepositoryFragmentTest {

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
    fun givenRepository_whenInitialized_thenDisplaysRepositoryInfoAndListOfIssues() {
        // Given :
        val bundle =
            RepositoryFragmentArgs(dataSource.repositories[0], dataSource.user.userName).toBundle()

        // When :
        launchFragmentInContainer<RepositoryFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.repo_name)).check(matches(withText(dataSource.repositories[0].name)))
        onView(withText(dataSource.issues[0].title)).check(matches(isDisplayed()))
    }

    @Test
    fun givenListOfIssues_whenAnyOneIssueClicked_thenNavigatesToIssueScreen() {
        // Given :
        val bundle =
            RepositoryFragmentArgs(dataSource.repositories[0], dataSource.user.userName).toBundle()
        val scenario =
            launchFragmentInContainer<RepositoryFragment>(bundle, R.style.Theme_GitHistory)
        val navController = mock(NavController::class.java)
        scenario.onFragment {
            Navigation.setViewNavController(it.view!!, navController)
        }

        // When :
        onView(withId(R.id.issues_list))
            .perform(
                RecyclerViewActions.actionOnItem<RecyclerView.ViewHolder>(
                    hasDescendant(withText(dataSource.issues[0].title)), click()
                )
            )

        // Then :
        verify(navController).navigate(
            RepositoryFragmentDirections.actionRepositoryFragmentToIssueFragment(
                dataSource.issues[0],
                dataSource.user.userName,
                dataSource.repositories[0].name
            )
        )
    }

    @ExperimentalCoroutinesApi
    @Test
    fun givenListOfIssues_whenInitialized_thenLoadingProgressbarIsDisplayed() {
        // Given :
        mainCoroutineRuleAndroid.pauseDispatcher()

        // When :
        val bundle =
            RepositoryFragmentArgs(dataSource.repositories[0], dataSource.user.userName).toBundle()
        launchFragmentInContainer<RepositoryFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.loading_issues_progress_bar)).check(matches(isDisplayed()))

        // When :
        mainCoroutineRuleAndroid.resumeDispatcher()

        // Then :
        onView(withId(R.id.loading_issues_progress_bar)).check(matches(not(isDisplayed())))

    }

    @Test
    fun givenEmptyListOfIssues_whenInitialized_thenDisplaysNoIssuesFound() {
        // Given :
        dataSource.setShouldReturnEmpty(true)
        val bundle =
            RepositoryFragmentArgs(dataSource.repositories[0], dataSource.user.userName).toBundle()

        // When :
        launchFragmentInContainer<RepositoryFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.empty_issue_list_text)).check(matches(isDisplayed()))
    }

    @Test
    fun givenNetworkError_whenInitialized_thenDisplaysSnackbarWithErrorMessage() {
        // Given :
        dataSource.setShouldReturnError(true)
        val bundle =
            RepositoryFragmentArgs(dataSource.repositories[0], dataSource.user.userName).toBundle()

        // When :
        launchFragmentInContainer<RepositoryFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withText(R.string.issues_fetch_error)).check(matches(isDisplayed()))
    }
}