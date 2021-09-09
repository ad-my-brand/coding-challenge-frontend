package com.adityaoo7.githistory.presentation.search

import android.os.Bundle
import androidx.fragment.app.testing.launchFragmentInContainer
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.test.core.app.ApplicationProvider.getApplicationContext
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.MediumTest
import androidx.test.filters.SmallTest
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.TestApplication
import com.adityaoo7.githistory.data.source.FakeDataSourceAndroid
import com.adityaoo7.githistory.di.TestAppComponent
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify
import javax.inject.Inject

@RunWith(AndroidJUnit4::class)
@MediumTest
class SearchFragmentTest {

    @Inject
    lateinit var dataSource: FakeDataSourceAndroid

    @Before
    fun setUp() {
        val application = getApplicationContext() as TestApplication
        val appComponent = application.appComponent as TestAppComponent
        appComponent.inject(this)
    }

    @Test
    fun givenUserName_whenSearchButtonPressed_thenNavigatesToUserScreen() {
        // Given :
        val scenario = launchFragmentInContainer<SearchFragment>(Bundle(), R.style.Theme_GitHistory)
        val navController = mock(NavController::class.java)
        scenario.onFragment {
            Navigation.setViewNavController(it.view!!, navController)
        }

        // When :
        onView(withId(R.id.user_name_edit_text)).perform(
            typeText("Aditya-OO7"),
            closeSoftKeyboard()
        )

        onView(withId(R.id.search_button)).perform(click())

        // Then :
        verify(navController).navigate(
            SearchFragmentDirections.actionSearchFragmentToUserFragment(dataSource.user)
        )
    }

    @Test
    fun givenEmptyUserNameField_whenSearchButtonPressed_thenReturnsSnackbarWithErrorMessage() {
        // Given :
        launchFragmentInContainer<SearchFragment>(Bundle(), R.style.Theme_GitHistory)

        // When :
        onView(withId(R.id.search_button)).perform(click())

        // Then :
        onView(withText(R.string.empty_field_error)).check(matches(isDisplayed()))
    }

    @Test
    fun givenNetworkError_whenSearchButtonPressed_thenReturnsSnackbarWithErrorMessage() {
        // Given :
        dataSource.setShouldReturnError(true)
        launchFragmentInContainer<SearchFragment>(Bundle(), R.style.Theme_GitHistory)

        // When :
        onView(withId(R.id.user_name_edit_text)).perform(
            typeText("Aditya-OO7"),
            closeSoftKeyboard()
        )

        onView(withId(R.id.search_button)).perform(click())

        // Then :
        onView(withText(R.string.user_fetch_error)).check(matches(isDisplayed()))
    }
}