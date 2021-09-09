package com.adityaoo7.githistory

import android.app.Activity
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.RecyclerView
import androidx.test.core.app.ActivityScenario
import androidx.test.core.app.ApplicationProvider
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.contrib.RecyclerViewActions
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import com.adityaoo7.githistory.data.source.FakeDataSourceAndroid
import com.adityaoo7.githistory.di.TestAppComponent
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import javax.inject.Inject

@RunWith(AndroidJUnit4::class)
@LargeTest
class AppNavigationTest {

    @Inject
    lateinit var dataSource: FakeDataSourceAndroid

    @Before
    fun setUp() {
        val application = ApplicationProvider.getApplicationContext() as TestApplication
        val appComponent = application.appComponent as TestAppComponent
        appComponent.inject(this)
    }

    @Test
    fun givenUserName_whenNavigatingToIssue_thenNavigatesToIssueSuccessfully() {
        // Given :
        ActivityScenario.launch(MainActivity::class.java)

        // When :
        onView(withId(R.id.user_name_edit_text)).perform(
            typeText(dataSource.user.userName),
            closeSoftKeyboard()
        )
        onView(withId(R.id.search_button)).perform(click())

        // Then :
        onView(withId(R.id.user_name_text_view)).check(matches(withText(dataSource.user.userName)))

        // When :
        onView(withId(R.id.repository_list)).perform(
            RecyclerViewActions.actionOnItem<RecyclerView.ViewHolder>(
                hasDescendant(withText(dataSource.repositories[0].name)), click()
            )
        )

        // Then :
        onView(withId(R.id.repo_name)).check(matches(withText(dataSource.repositories[0].name)))

        // When :
        onView(withId(R.id.issues_list)).perform(
            RecyclerViewActions.actionOnItem<RecyclerView.ViewHolder>(
                hasDescendant(withText(dataSource.issues[0].title)), click()
            )
        )

        // Then :
        onView(withId(R.id.issue_title)).check(matches(withText(dataSource.issues[0].title)))
        onView(withText(dataSource.comments[0].body)).check(matches(isDisplayed()))
    }

    @Test
    fun givenNavigatedToIssue_whenUpButtonPressed_thenNavigatesToPreviousScreenSuccessfully() {
        // Given :
        val activityScenario = ActivityScenario.launch(MainActivity::class.java)

        onView(withId(R.id.user_name_edit_text)).perform(
            typeText(dataSource.user.userName),
            closeSoftKeyboard()
        )
        onView(withId(R.id.search_button)).perform(click())
        onView(withId(R.id.repository_list)).perform(
            RecyclerViewActions.actionOnItem<RecyclerView.ViewHolder>(
                hasDescendant(withText(dataSource.repositories[0].name)), click()
            )
        )
        onView(withId(R.id.issues_list)).perform(
            RecyclerViewActions.actionOnItem<RecyclerView.ViewHolder>(
                hasDescendant(withText(dataSource.issues[0].title)), click()
            )
        )

        onView(withId(R.id.issue_title)).check(matches(withText(dataSource.issues[0].title)))

        // When :
        onView(
            withContentDescription(activityScenario.getToolbarNavigationContentDescription())
        ).perform(click())

        // Then :
        onView(withId(R.id.repo_name)).check(matches(withText(dataSource.repositories[0].name)))

        // When :
        onView(
            withContentDescription(activityScenario.getToolbarNavigationContentDescription())
        ).perform(click())

        // Then :
        onView(withId(R.id.user_name_text_view)).check(matches(withText(dataSource.user.userName)))

        // When :
        onView(
            withContentDescription(activityScenario.getToolbarNavigationContentDescription())
        ).perform(click())

        // Then :
        onView(withId(R.id.search_button)).check(matches(isDisplayed()))

        activityScenario.close()
    }
}


fun <T : Activity> ActivityScenario<T>.getToolbarNavigationContentDescription(): String {
    var description = ""
    onActivity {
        description = it.findViewById<Toolbar>(R.id.toolbar).navigationContentDescription as String
    }
    return description
}