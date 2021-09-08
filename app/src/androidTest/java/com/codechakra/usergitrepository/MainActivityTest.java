package com.codechakra.usergitrepository;

import android.os.Handler;

import androidx.test.ext.junit.rules.ActivityScenarioRule;

import com.codechakra.usergitrepository.activities.MainActivity;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class MainActivityTest {
    @Rule

    public ActivityScenarioRule<MainActivity> mainActivityActivityScenarioRule = new ActivityScenarioRule<MainActivity>(MainActivity.class);

    @Before
    public void setUp() throws Exception {

    }

    @Test
    public void TestFunc() {
        String login_id = "octocat";
        String code_response="Code : 404";
        String error_response="something went wrong";
        mainActivityActivityScenarioRule.getScenario().onActivity(activity -> {

            activity.getUserHistory(login_id);
        // Executing assert methods after some delay is necessary because callback function in getUserHistor
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {

                    assertNotEquals(code_response, activity.git_history_textview.getText().toString());
                    assertNotEquals(error_response, activity.git_history_textview.getText().toString());
                }
            }, 500);

            // use 'activity'.
        });
    }

    @After
    public void tearDown() throws Exception {
    }
}