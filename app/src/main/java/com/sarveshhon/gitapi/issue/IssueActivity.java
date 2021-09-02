package com.sarveshhon.gitapi.issue;

import static com.sarveshhon.gitapi.Helper.API_REPO;
import static com.sarveshhon.gitapi.Helper.ARG_PER_PAGE;
import static com.sarveshhon.gitapi.Helper.PATH_ISSUES;
import static com.sarveshhon.gitapi.Helper.PARAM_PAGE;
import static com.sarveshhon.gitapi.Helper.PARAM_PER_PAGE;
import static com.sarveshhon.gitapi.Helper.blackIconStatusBar;
import static com.sarveshhon.gitapi.IntroActivity.USERNAME;

import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.NestedScrollView;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.sarveshhon.gitapi.R;
import com.sarveshhon.gitapi.databinding.ActivityIssueBinding;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class IssueActivity extends AppCompatActivity {

    //Activity binding for Views
    ActivityIssueBinding binding;

    // Adapter and List for Fetched Items
    IssueAdapter issueAdapter;
    List<IssueModel> list = new ArrayList<>();

    // Parameter for Pagination
    int page = 1, limit = 50;

    // Issues API url;
    String api_url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityIssueBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // set StatusBar Colour
        blackIconStatusBar(this, R.color.white_grey_lite);

        // fetchIssue Method Call
        fetchIssue(page);

        // Pagination for items
        binding.nsvIssue.setOnScrollChangeListener((NestedScrollView.OnScrollChangeListener) (v, scrollX, scrollY, oldScrollX, oldScrollY) -> {
            if (scrollY == v.getChildAt(0).getMeasuredHeight() - v.getMeasuredHeight()) {
                page++;
                binding.pbLoading.setVisibility(View.VISIBLE);
                fetchIssue(page);
            }
        });

    }

    // FetchIssue Method Definition
    private void fetchIssue(int _page) {

        // Api initialised
        api_url = API_REPO + USERNAME + getIntent().getStringExtra("repo") + PATH_ISSUES + PARAM_PAGE + _page + PARAM_PER_PAGE + ARG_PER_PAGE;

        // Pagination Parameters check
        if (page > limit) {
            binding.pbLoading.setVisibility(View.GONE);
            return;
        }

        // Fetching Data API Request
        StringRequest request = new StringRequest(Request.Method.GET, api_url, response -> {

            try {

                JSONArray jsonArray = new JSONArray(response);

                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject jsonObject = jsonArray.getJSONObject(i);
                    JSONObject jsonObject1 = jsonObject.getJSONObject("user");

                    // Add Items to List
                    list.add(new IssueModel(
                            jsonObject.getString("title"),
                            jsonObject.getString("state"),
                            jsonObject.getInt("number"),
                            jsonObject1.getString("login"),
                            jsonObject.getString("created_at"),
                            jsonObject.getString("html_url")

                    ));

                }

                // One of the Condition for Ending Pagination
                if (jsonArray.length() < Integer.parseInt(ARG_PER_PAGE)) {
                    page = limit;
                }

                // Condition for Making ProgressBar Invisible
                if (list.size() < 10) {
                    binding.pbLoading.setVisibility(View.GONE);
                }

                // Attaching data to recyclerview
                binding.rvIssue.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
                issueAdapter = new IssueAdapter(this, list);
                binding.rvIssue.setAdapter(issueAdapter);


            } catch (Exception ignored) {

            }

        }, error -> {
            Toast.makeText(this, "Something went wrong\ntry after sometime", Toast.LENGTH_SHORT).show();
        });

        // Add Network Request in Queue
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(request);
    }

}