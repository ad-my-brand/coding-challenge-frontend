package com.example.sudgoyalapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class IssueActivity extends AppCompatActivity {
    RecyclerView IssueList;
    ArrayList<IssueData> issueData;

    String url = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_issue);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Bundle extras = getIntent().getExtras();
        String repourl = extras.getString("repourl");

        toolbar.findViewById(R.id.backbutton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBackPressed();
            }
        });

        //TODO:Initialise

        IssueList = findViewById(R.id.issueList);

        issueData = new ArrayList<>();

        url = repourl + "/issues";

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, url,null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {

                if (response.length() == 0) {
                    Toast.makeText(getApplicationContext(), "No Issues Found", Toast.LENGTH_LONG).show();
                } else {


                    for (int i = 0; i < response.length(); i++) {
                        JSONObject data;
                        try {
                            data = response.getJSONObject(i);
                            Log.d("ISSUE", "onResponse: " + data.getString("title"));
                            issueData.add(new IssueData(data.getString("title"), data.getString("body"),
                                    data.getString("html_url")));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    IssueList.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                    IssueAdapter repo = new IssueAdapter(issueData, getApplicationContext());
                    IssueList.setAdapter(repo);

                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });

        RequestQueue requestQueue = Volley.newRequestQueue(this);
        Volley.newRequestQueue(getApplicationContext()).add(request);
    }

}