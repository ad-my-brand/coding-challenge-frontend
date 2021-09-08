package com.codechakra.usergitrepository.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.codechakra.usergitrepository.GithubApiService;
import com.codechakra.usergitrepository.R;
import com.codechakra.usergitrepository.RecycleAdapter;
import com.codechakra.usergitrepository.UsefulVariables;
import com.codechakra.usergitrepository.models.Repos;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class RepoActivity extends AppCompatActivity {
    RecyclerView recyclerView;
    RecycleAdapter recycleAdapter;

    public String error_code = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_repo);
        String login_id = getIntent().getStringExtra("login_id");
        UsefulVariables.username = login_id;
        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        if (login_id != null)
            getListofRepos(login_id);
    }

    public void getListofRepos(String login) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.github.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        GithubApiService githubApiService = retrofit.create(GithubApiService.class);
        Call<List<Repos>> callusers = githubApiService.getUserRepo(login);
        callusers.enqueue(new Callback<List<Repos>>() {
            @Override
            public void onResponse(Call<List<Repos>> call, Response<List<Repos>> response) {
                if (!response.isSuccessful()) {
                    error_code = "Code : " + response.code();

                    return;
                }
                List<Repos> USER = response.body();
                if (USER != null) {

                    recycleAdapter = new RecycleAdapter(USER);
                    recyclerView.setAdapter(recycleAdapter);
                }

            }

            @Override
            public void onFailure(Call<List<Repos>> call, Throwable t) {

                error_code = "something went wrong";
            }
        });
    }
}