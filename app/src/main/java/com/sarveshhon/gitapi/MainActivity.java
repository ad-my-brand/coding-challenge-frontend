package com.sarveshhon.gitapi;

import static com.sarveshhon.gitapi.Helper.API_USER;
import static com.sarveshhon.gitapi.Helper.blackIconStatusBar;
import static com.sarveshhon.gitapi.Helper.openCustomTab;
import static com.sarveshhon.gitapi.IntroActivity.USERNAME;

import android.net.Uri;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.fragment.app.FragmentManager;
import androidx.viewpager2.widget.ViewPager2;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.google.android.material.tabs.TabLayout;
import com.sarveshhon.gitapi.databinding.ActivityMainBinding;

import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {


    //Activity binding for Views
    ActivityMainBinding binding;

    // ViewPager Adapter for Tabs
    ViewPagerFragmentAdapter pagerFragmentAdapter;

    // UserData API Url
    String api_url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // set StatusBar Colour
        blackIconStatusBar(this, R.color.white_grey_lite);

        // Fragment Manger for Tabs ViewPager
        FragmentManager fm = getSupportFragmentManager();

        // Attaching to Viewpager
        pagerFragmentAdapter = new ViewPagerFragmentAdapter(fm, getLifecycle());
        binding.vpTabs.setAdapter(pagerFragmentAdapter);

        // Adding Tabs
        binding.tlTabs.addTab(binding.tlTabs.newTab().setText("Overview"));
        binding.tlTabs.addTab(binding.tlTabs.newTab().setText("Repositories"));

        // Tab onClick
        binding.tlTabs.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                binding.vpTabs.setCurrentItem(tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        // ViewPager On Callback
        binding.vpTabs.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {

                binding.tlTabs.selectTab(binding.tlTabs.getTabAt(position));
            }
        });

        // FetchUserData Method Call
        fetchUserData();

    }


    // fetchUserData method definition
    private void fetchUserData() {

        // API Initialisation
        api_url = API_USER + USERNAME;

        // API Request
        StringRequest request = new StringRequest(Request.Method.GET, api_url, response -> {

            try {

                JSONObject object = new JSONObject(response);

                // Set Data to Views
                binding.tvUsername.setText(object.getString("login"));
                binding.tvName.setText(object.getString("name"));
                binding.tvRepository.setText(String.valueOf(object.getInt("public_repos")));
                binding.tvFollowers.setText(String.valueOf(object.getInt("followers")));
                binding.tvFollowing.setText(String.valueOf(object.getInt("following")));
                binding.tvBio.setText(object.getString("bio"));
                Glide.with(this).load(object.getString("avatar_url")).into(binding.ivAvatar);

                // Profile URL
                String url = object.getString("html_url");

                // Visit Profile Click and Opens Profile in ChromeCustomTab
                binding.btnVisitProfile.setOnClickListener(v -> {

                    if (!url.isEmpty()) {
                        CustomTabsIntent.Builder customIntent = new CustomTabsIntent.Builder();
                        openCustomTab(this, customIntent.build(), Uri.parse(url));
                    } else {
                        Toast.makeText(this, "Wait for sometime", Toast.LENGTH_SHORT).show();
                    }

                });

            } catch (Exception ignored) {

            }

        }, error -> {

        });

        // Add Requests in Queue
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(request);
    }

}