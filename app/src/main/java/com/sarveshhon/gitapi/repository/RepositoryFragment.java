package com.sarveshhon.gitapi.repository;

import static com.sarveshhon.gitapi.Helper.API_USER;
import static com.sarveshhon.gitapi.Helper.ARG_PER_PAGE;
import static com.sarveshhon.gitapi.Helper.PARAM_PAGE;
import static com.sarveshhon.gitapi.Helper.PARAM_PER_PAGE;
import static com.sarveshhon.gitapi.Helper.PATH_REPOS;
import static com.sarveshhon.gitapi.IntroActivity.USERNAME;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.core.widget.NestedScrollView;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.sarveshhon.gitapi.databinding.FragmentRepositoryBinding;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class RepositoryFragment extends Fragment {

    //Fragment binding for Views
    FragmentRepositoryBinding binding;

    // Adapter and List for Fetched Items
    RepositoryAdapter repositoryAdapter;
    List<RepositoryModel> list = new ArrayList<>();

    // Parameter for Pagination
    int page = 1, limit = 50;

    // Repository API url;
    String api_url;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentRepositoryBinding.inflate(getLayoutInflater());

        // FetchRepository Method Call
        fetchRepository(page);

        // Pagination for items
        binding.nsvRepository.setOnScrollChangeListener((NestedScrollView.OnScrollChangeListener) (v, scrollX, scrollY, oldScrollX, oldScrollY) -> {
            if (scrollY == v.getChildAt(0).getMeasuredHeight() - v.getMeasuredHeight()) {
                page++;
                binding.pbLoading.setVisibility(View.VISIBLE);
                fetchRepository(page);
            }
        });

        return binding.getRoot();

    }

    // fetchRepository Method Definition
    private void fetchRepository(int _page) {

        // Api initialised
        api_url = API_USER + USERNAME + PATH_REPOS + PARAM_PAGE + _page + PARAM_PER_PAGE + ARG_PER_PAGE;

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
                    JSONObject jsonObject1 = jsonObject.getJSONObject("owner");

                    // Add Items to List
                    list.add(new RepositoryModel(
                            jsonObject.getString("name"),
                            jsonObject.getString("description"),
                            jsonObject.getString("created_at"),
                            jsonObject.getInt("forks_count"),
                            jsonObject.getInt("watchers"),
                            jsonObject.getInt("open_issues_count"),
                            jsonObject1.getString("avatar_url"),
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
                repositoryAdapter = new RepositoryAdapter(getContext(), list);
                binding.rvRepository.setLayoutManager(new LinearLayoutManager(getContext(), RecyclerView.VERTICAL, false));
                binding.rvRepository.setAdapter(repositoryAdapter);

            } catch (Exception ignored) {

            }

        }, error -> {
            Toast.makeText(getContext(), "Something went wrong\ntry after sometime", Toast.LENGTH_SHORT).show();
        });

        // Add Network Request in Queue
        RequestQueue requestQueue = Volley.newRequestQueue(getContext());
        requestQueue.add(request);
    }

}