package com.example.gitapiapplication.Screens;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import com.example.gitapiapplication.R;
import com.example.gitapiapplication.adapter.ReposAdapter;
import com.example.gitapiapplication.model.GitHubRepo;
import com.example.gitapiapplication.Dao.APIClient;
import com.example.gitapiapplication.res.GitHubRepoEndPoint;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Repositories extends AppCompatActivity {

    String receivedUserName;
    TextView userNameTV;
    RecyclerView mRecyclerView;
    List<GitHubRepo> myDataSource = new ArrayList<>();
    RecyclerView.Adapter myAdapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_repositories);

        Bundle extras = getIntent().getExtras();
        receivedUserName = extras.getString("username");

        userNameTV =  findViewById(R.id.userNameTV);

        userNameTV.setText("User: " + receivedUserName);

        mRecyclerView=  findViewById(R.id.repos_recycler_view);

        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        DividerItemDecoration mDividerItemDecoration = new DividerItemDecoration(
                mRecyclerView.getContext(), LinearLayoutManager.VERTICAL
        );
        mRecyclerView.addItemDecoration(mDividerItemDecoration);
        myAdapter = new ReposAdapter(myDataSource, R.layout.list_item_repo,
                getApplicationContext());

        mRecyclerView.setAdapter(myAdapter);

        loadRepositories();

    }

    public void loadRepositories(){
        GitHubRepoEndPoint apiService =
                APIClient.getClient().create(GitHubRepoEndPoint.class);

        Call<List<GitHubRepo>> call = apiService.getRepo(receivedUserName);
        call.enqueue(new Callback<List<GitHubRepo>>() {
            @Override
            public void onResponse(Call<List<GitHubRepo>> call, Response<List<GitHubRepo>> response) {

                myDataSource.clear();
                myDataSource.addAll(response.body());
                myAdapter.notifyDataSetChanged();
//                Intent intent = new Intent(Repositories.this,ReposAdapter.class);
//                intent.putExtra("username", receivedUserName);
//                startActivity(intent);
            }

            @Override
            public void onFailure(Call<List<GitHubRepo>> call, Throwable t) {
                // Log error here since request failed
                Log.e("Repos", t.toString());
            }

        });
    }
}

