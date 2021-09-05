package com.executivestrokes.githubreposissues;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import com.executivestrokes.Adapters.ReposAdapter;
import com.executivestrokes.RestApi.RepoInterface;
import com.executivestrokes.RestApi.RetrofitCall;
import com.executivestrokes.model.RepoModel;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RepoActivity extends AppCompatActivity {
    String receivedUserName;
    TextView userName;
    RecyclerView mRecyclerView;
    List<RepoModel> repoData = new ArrayList<>();
    RecyclerView.Adapter repoAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_repo);
        Bundle extras = getIntent().getExtras();
        receivedUserName = extras.getString("username");
        userName =  findViewById(R.id.userName);
        userName.setText("User : " + receivedUserName);
        //Adapter and Recycler
        mRecyclerView=  findViewById(R.id.repos_recycler_view);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        repoAdapter = new ReposAdapter(repoData, R.layout.list_item_repos,
                getApplicationContext(), new ReposAdapter.RecyclerViewOnClickListner() {
            @Override
            public void onIttemClick(String name) {
                Intent intent=new Intent (RepoActivity.this,IssuesActivity.class);
                intent.putExtra("USERS",receivedUserName);
                intent.putExtra("repoTitle",name);
                startActivity(intent);
            }
        });
        mRecyclerView.setAdapter(repoAdapter);
        //Instance of interface
        RepoInterface RepoInterface= RetrofitCall.getUserInfo().create(RepoInterface.class);
        if(receivedUserName!=null)
        {
            Call<List<RepoModel>> call = RepoInterface.getRepo(receivedUserName);
            call.enqueue(new Callback<List<RepoModel>>() {
                @Override
                public void onResponse(Call<List<RepoModel>> call, Response<List<RepoModel>> response) {
                    if(response.isSuccessful())
                    {
                        repoData.clear();
                        repoData.addAll(response.body());
                        repoAdapter.notifyDataSetChanged();
                    }
                    else
                    {
                        Toast.makeText(RepoActivity.this,"Error ! No Repository Found...",Toast.LENGTH_SHORT).show();
                    }
                }
                @Override
                public void onFailure(Call<List<RepoModel>> call, Throwable t) {
                    System.out.println("Failed!" + t.toString());
                }
            });
        }
        else
        {
            Toast.makeText(RepoActivity.this,"Error ! Getting User...",Toast.LENGTH_SHORT).show();
        }
    }
}

