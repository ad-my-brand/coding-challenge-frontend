package com.harivansh.gitinfo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import com.harivansh.gitinfo.adapter.IssueAdapter;
import com.harivansh.gitinfo.databinding.ActivityIssueScreenBinding;
import com.harivansh.gitinfo.model.Issue;
import com.harivansh.gitinfo.request.RequestSingleton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class IssueScreen extends AppCompatActivity {

    private ActivityIssueScreenBinding binding;

    private ArrayList<Issue> issueArrayList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityIssueScreenBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        // issue array

        issueArrayList = new ArrayList<>();

        String repoName = "Repo";

        Bundle extras = getIntent().getExtras();
        if (extras != null){
            repoName = extras.getString("repoName");
        }

        // repo name
        binding.repoNameissue.setText(repoName);

        Log.d("reponame",repoName);


        // getting issue from api
        String url ="https://api.github.com/repos/"+repoName+"/issues";

        StringRequest request = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            for(int i = 0; i < jsonArray.length();i++){
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                issueArrayList.add(new Issue(jsonObject.getString("title")));

                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                error -> Toast.makeText(IssueScreen.this,"error",Toast.LENGTH_LONG).show());

        RequestSingleton.getInstance(IssueScreen.this).addToRequestQueue(request);

        // issue recycle view
        setAdapter();

        if (issueArrayList.size() == 0){
            Toast.makeText(IssueScreen.this,"No issues in this repo",Toast.LENGTH_LONG).show();
        }





    }

    private void setAdapter() {
        IssueAdapter issueAdapter = new IssueAdapter(issueArrayList);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getApplicationContext());

        binding.issuesRecycleView.setLayoutManager(layoutManager);
        binding.issuesRecycleView.setItemAnimator(new DefaultItemAnimator());
        binding.issuesRecycleView.setAdapter(issueAdapter);

    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        binding = null;
    }
}