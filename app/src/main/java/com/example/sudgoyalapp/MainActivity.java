package com.example.sudgoyalapp;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.Editable;
import android.util.Log;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.widget.Toolbar;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.Target;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
    String TAG = "MainActivity";

    frontpageData fpd;
    String user = "google";
    Button repoButton;
    ImageView avatar;
    TextView webRepo, repos, gists, followers, following ,User , email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //TODO: Set ToolBar

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //TODO: Initialise Buttons Textview etc

        repoButton = findViewById(R.id.repositories);
        webRepo = findViewById(R.id.showProfile);
        repos = findViewById(R.id.publicRepos);
        gists = findViewById(R.id.publicGists);
        followers = findViewById(R.id.followers);
        following = findViewById(R.id.following);
        User = findViewById(R.id.userName);
        email = findViewById(R.id.email);
        avatar = findViewById(R.id.avatar);

        //TODO: function calls
        letsfetchData(user);

        //TODO: Set Up Onclicklisteners

        toolbar.findViewById(R.id.changeUser).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeUser();
            }
        });

        //OnClicklistener for repository button

        repoButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(MainActivity.this,RepositoryActivity.class);
                i.putExtra("USER", user);
                startActivity(i);
            }
        });

        //OnClicklistener for showProfile button

        webRepo.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                //TODO: Navigate to github in chrome
                String url = "https://github.com/" + user;
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(Intent.createChooser(intent, "Open with"));

            }
        });


    }

    //TODO: Function to fetch data and to render it to the textviews

    void letsfetchData(String gitid){
        String url = "https://api.github.com/users/" + gitid;

        StringRequest request = new StringRequest(Request.Method.GET, url, new Response.Listener<String>(){
            @Override
            public void onResponse(String response) {
                Log.d(TAG, "onResponse: "+ response);

                try {

                    JSONObject jsonObject = new JSONObject(response);

                    String user = jsonObject.getString("login");
                    User.setText(user);//rendering user

                    fpd = new frontpageData();//Setting up our custom data class

                    //Setting up data ion class

                    fpd.setGists("Gists: " + jsonObject.getString("public_gists"));
                    fpd.setRepos("Repositories:  " + jsonObject.getString("public_repos"));
                    fpd.setEmail(jsonObject.getString("email"));
                    fpd.setImg(jsonObject.getString("avatar_url"));
                    fpd.setFollowers("Followers: " + jsonObject.
                            getString("followers"));
                    fpd.setFollowing("Following: " + jsonObject.
                            getString("following"));

                    renderItems();//Function call to render items


                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        },new Response.ErrorListener(){
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                errorToast("Some error occurred!! Please Check Git ID");

            }
        });

        RequestQueue rQueue = Volley.newRequestQueue(MainActivity.this);
        rQueue.add(request);

    }
    void renderItems(){
        //Rendering text items
        if(fpd.getEmail().toString() == "null") {
            email.setVisibility(View.INVISIBLE);
        }
        else{email.setText(fpd.getEmail().toString());}

        Glide.with(MainActivity.this).load(fpd.getImg()
                .toString().trim())
                .override(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL)
                .error(R.drawable.githubicon).into(avatar);

        following.setText(fpd.getFollowing().toString());
        followers.setText(fpd.getFollowers().toString());
        gists.setText(fpd.getGists().toString());
        repos.setText(fpd.getRepos().toString());

    }
    void errorToast(String error){
        Toast.makeText(MainActivity.this, error,
                Toast.LENGTH_SHORT).show();

    }

    //TODO: Function to change User or gitid
    void changeUser(){
        final EditText input = new EditText(MainActivity.this);
        new AlertDialog.Builder(MainActivity.this)
                .setTitle("Change ID")
                .setView(input)
                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int whichButton) {
//                        changeUser(input.getText().toString());
                        String newId = input.getText().toString();
                        letsfetchData(newId);
                        user = newId;
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int whichButton) {
                    }
                }).show();

    }
}