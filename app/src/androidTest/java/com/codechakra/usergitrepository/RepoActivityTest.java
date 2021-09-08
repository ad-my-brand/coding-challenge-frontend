package com.codechakra.usergitrepository;

import android.os.Handler;

import androidx.test.ext.junit.rules.ActivityScenarioRule;

import com.codechakra.usergitrepository.activities.RepoActivity;

import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class RepoActivityTest {
    @Rule
    public ActivityScenarioRule<RepoActivity> repoActivityActivityScenarioRule = new ActivityScenarioRule<>(RepoActivity.class);

    @Test
    public void TestRepoFunc() {
       String login_id = "octocat";
       String code_response="Code : 404";
       String error_response="something went wrong";

        repoActivityActivityScenarioRule.getScenario().onActivity(activity -> {
            activity.getListofRepos(login_id);
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {

                    assertNotEquals(code_response, activity.error_code);
                    assertNotEquals(error_response, activity.error_code);
                }
            }, 500);
        });
    }
}