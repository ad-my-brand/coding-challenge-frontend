package com.sarveshhon.gitapi;

import android.app.Activity;
import android.net.Uri;
import android.view.View;
import android.view.WindowManager;

import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.content.ContextCompat;

public class Helper {

    // APIs
    public static String API_USER = "https://api.github.com/users";
    public static String API_REPO = "https://api.github.com/repos";

    // APIs paths
    public static String PATH_EVENTS = "/events";
    public static String PATH_REPOS = "/repos";
    public static String PATH_ISSUES = "/issues";

    // APIs parameters
    public static String PARAM_PAGE = "?page=";
    public static String PARAM_PER_PAGE = "&per_page=";

    // APIs argument
    public static String ARG_PER_PAGE = "15";

    // Set the Status Bar Color
    public static void blackIconStatusBar(Activity activity, int color) {

        activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        activity.getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
        activity.getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        activity.getWindow().setStatusBarColor(ContextCompat.getColor(activity, color));

    }

    // Open ChromeCustom Tabs using passed arguments
    public static void openCustomTab(Activity activity, CustomTabsIntent customTabsIntent, Uri uri) {
        String packageName = "com.android.chrome";
        customTabsIntent.intent.setPackage(packageName);
        customTabsIntent.launchUrl(activity, uri);
    }
}