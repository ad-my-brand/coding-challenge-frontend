package com.adityaoo7.githistory.presentation.issue

import androidx.fragment.app.testing.launchFragmentInContainer
import androidx.test.core.app.ApplicationProvider
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.assertion.ViewAssertions.matches
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
import javax.inject.Inject

@RunWith(AndroidJUnit4::class)
@MediumTest
class IssueFragmentTest {

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
    fun givenIssue_whenInitialized_thenDisplaysIssueInfoAndListOfComments() {
        // Given :
        val bundle = IssueFragmentArgs(
            dataSource.issues[0],
            dataSource.user.userName,
            dataSource.repositories[0].name
        ).toBundle()

        // When :
        launchFragmentInContainer<IssueFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.issue_title)).check(matches(withText(dataSource.issues[0].title)))
        onView(withText(dataSource.comments[0].body)).check(matches(isDisplayed()))
    }

    @ExperimentalCoroutinesApi
    @Test
    fun givenListOfComments_whenInitialized_thenLoadingProgressbarIsDisplayed() {
        // Given :
        mainCoroutineRuleAndroid.pauseDispatcher()

        val bundle = IssueFragmentArgs(
            dataSource.issues[0],
            dataSource.user.userName,
            dataSource.repositories[0].name
        ).toBundle()

        // When :
        launchFragmentInContainer<IssueFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.loading_comments_progress_bar)).check(matches(isDisplayed()))

        // When :
        mainCoroutineRuleAndroid.resumeDispatcher()

        // Then :
        onView(withId(R.id.loading_comments_progress_bar)).check(matches(not(isDisplayed())))

    }

    @Test
    fun givenEmptyListOfComments_whenInitialized_thenDisplaysNoCommentsFound() {
        // Given :
        dataSource.setShouldReturnEmpty(true)

        val bundle = IssueFragmentArgs(
            dataSource.issues[0],
            dataSource.user.userName,
            dataSource.repositories[0].name
        ).toBundle()

        // When :
        launchFragmentInContainer<IssueFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withId(R.id.empty_comment_list)).check(matches(isDisplayed()))
    }

    @Test
    fun givenNetworkError_whenInitialized_thenDisplaysSnackbarWithErrorMessage() {
        // Given :
        dataSource.setShouldReturnError(true)

        val bundle = IssueFragmentArgs(
            dataSource.issues[0],
            dataSource.user.userName,
            dataSource.repositories[0].name
        ).toBundle()

        // When :
        launchFragmentInContainer<IssueFragment>(bundle, R.style.Theme_GitHistory)

        // Then :
        onView(withText(R.string.comments_fetch_error)).check(matches(isDisplayed()))
    }
}