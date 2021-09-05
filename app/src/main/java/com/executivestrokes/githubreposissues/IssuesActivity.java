package com.executivestrokes.githubreposissues;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import com.executivestrokes.Adapters.IssueAdapter;
import com.executivestrokes.RestApi.IssueInterface;
import com.executivestrokes.RestApi.RetrofitCall;
import com.executivestrokes.model.IssueModel;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class IssuesActivity extends AppCompatActivity {
    String owner;
    String repo;
    TextView txt;
    RecyclerView mRecyclerView;
    List<IssueModel> issueData = new ArrayList<>();
    RecyclerView.Adapter issuAdapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_issues);
        txt=findViewById(R.id.textView);
        Bundle extras = getIntent().getExtras();
        owner = extras.getString("USERS");
        repo = extras.getString("repoTitle");
        txt.setText("User : "+owner+"\nRepository : "+repo);

        //Adapter and Recycler
        mRecyclerView=  findViewById(R.id.issue_recycler_view);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        issuAdapter = new IssueAdapter(issueData, R.layout.list_item_issues,
                getApplicationContext());

        mRecyclerView.setAdapter(issuAdapter);
        //Instance of interface
        IssueInterface issueInterface= RetrofitCall.getUserInfo().create(IssueInterface.class);
       if (owner!=null && repo!=null)
        {
            Call<List<IssueModel>> call = issueInterface.getIssues(owner,repo);
            call.enqueue(new Callback<List<IssueModel>>() {
                @Override
                public void onResponse(Call<List<IssueModel>> call, Response<List<IssueModel>> response) {
                    if(response.isSuccessful())
                    {
                        issueData.clear();
                        issueData.addAll(response.body());
                        issuAdapter.notifyDataSetChanged();
                    }
                    else
                    {
                        Toast.makeText(IssuesActivity.this,"Error ! No Issues found for the given Repository",Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<List<IssueModel>> call, Throwable t) {
                    System.out.println("Failed!" + t.toString());
                }
            });
        }
        else
        {
            Toast.makeText(IssuesActivity.this,"Error ! Getting User and Repository name...",Toast.LENGTH_SHORT).show();
        }



    }
}