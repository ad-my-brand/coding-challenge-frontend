package com.example.gitapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import adapter.ReposAdapter;
import model.GitHubRepo;
import rest.ApiClient;
import rest.GitHubRepoEndpoint;
import rest.GithubUserEndpoint;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Repositories extends AppCompatActivity {
    String receivedUserNames;
    TextView usernameTV;
    RecyclerView mRecyclerView;
    List<GitHubRepo> mDataSource = new ArrayList<>();
    RecyclerView.Adapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_repositories);

        Bundle extras = getIntent().getExtras();
        receivedUserNames = extras.getString("username");

        usernameTV = findViewById(R.id.usernameTV);
        usernameTV.setText("User: "+receivedUserNames);

        mRecyclerView = findViewById(R.id.repos_recycler_views);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        mAdapter = new ReposAdapter(mDataSource,R.layout.list_item_repo,getApplicationContext());
        mRecyclerView.setAdapter(mAdapter);

        loadRepositories();
    }

    private void loadRepositories() {
        GitHubRepoEndpoint apiService = ApiClient.getClient().create(GitHubRepoEndpoint.class);

        Call<List<GitHubRepo>> call = apiService.getRepo(receivedUserNames);
        call.enqueue(new Callback<List<GitHubRepo>>() {
            @Override
            public void onResponse(Call<List<GitHubRepo>> call, Response<List<GitHubRepo>> response) {
                mDataSource.clear();
                mDataSource.addAll(response.body());
                mAdapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Call<List<GitHubRepo>> call, Throwable t) {
                Log.d("Repos",t.toString());
            }
        });
    }
}