package com.harivansh.gitinfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;
import com.harivansh.gitinfo.adapter.RepoAdapter;
import com.harivansh.gitinfo.databinding.ActivityMainBinding;
import com.harivansh.gitinfo.model.Repo;
import com.harivansh.gitinfo.request.RequestSingleton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;

    private ArrayList<Repo> repoArrayList;
    private RepoAdapter.RepoViewClickListener listener;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);


        // repo list
        repoArrayList = new ArrayList<>();



        // get repo button
        binding.getrepo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // getting username from the edittext
                String userName = binding.gitUsername.getText().toString().trim();

                if (userName.length() != 0){

                    requestService(userName);
                    setAdapter();

                }else Snackbar.make(binding.getrepo,
                        getString(R.string.empty_username),
                        BaseTransientBottomBar.LENGTH_LONG).show();
            }
        });

    }

    private void setAdapter() {
        setOnClickListner();
        RepoAdapter repoAdapter = new RepoAdapter(repoArrayList,listener);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());
        binding.reposRecycleView.setLayoutManager(layoutManager);
        binding.reposRecycleView.setItemAnimator(new DefaultItemAnimator());
        binding.reposRecycleView.setAdapter(repoAdapter);
    }


    // function to pass data to other activity
    private void setOnClickListner() {

        listener = new RepoAdapter.RepoViewClickListener() {
            @Override
            public void onClick(View view, int position) {
                Intent intent = new Intent(getApplicationContext(),IssueScreen.class);
                intent.putExtra("repoName",repoArrayList.get(position).getRepoName());
                startActivity(intent);

            }
        };
    }


    // getting the repo data from the api
    private void requestService(String userName){

        String url ="https://api.github.com/users/"+userName+"/repos";

        StringRequest request = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            for(int i = 0; i < jsonArray.length();i++){
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                repoArrayList.add(new Repo(jsonObject.getString("full_name"),jsonObject.getString("description")));

                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Snackbar.make(binding.getrepo,
                                "That didn't work!",
                                BaseTransientBottomBar.LENGTH_LONG).show();
                    }
                });


        RequestSingleton.getInstance(MainActivity.this).addToRequestQueue(request);

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        binding = null;
    }
}