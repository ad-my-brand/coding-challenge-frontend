package com.example.gitapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.ExecutionException;

import model.GithubUsers;
import rest.ApiClient;
import rest.GithubUserEndpoint;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.Url;

public class UserActivity extends AppCompatActivity {
    ImageView imageView;
    TextView Login,followers,following,email,usernameTV;
    Button ownedreptbtn;
    Bundle extras;
    String newString;
    Bitmap myimag;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);
        imageView = findViewById(R.id.imageView);
        Login = findViewById(R.id.Login);
        followers = findViewById(R.id.followers);
        following = findViewById(R.id.following);
        email = findViewById(R.id.email);
        ownedreptbtn = findViewById(R.id.ownedreptbtn);
        usernameTV = findViewById(R.id.username);
        extras = getIntent().getExtras();
        newString = extras.getString("username");

        ownedreptbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UserActivity.this,Repositories.class);
                intent.putExtra("username",newString);
                startActivity(intent);
            }
        });

        loadData();
    }

    public class ImageDownloader extends AsyncTask<String,Void,Bitmap>
    {

        @Override
        protected Bitmap doInBackground(String... strings) {
            try {
                URL url = new URL(strings[0]);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.connect();
                InputStream inputStream = connection.getInputStream();
                Bitmap myBitmap = BitmapFactory.decodeStream(inputStream);
                return myBitmap;
            }
            catch (MalformedURLException e){
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
    }
    private void loadData() {
        final GithubUserEndpoint apiService = ApiClient.getClient().create(GithubUserEndpoint.class);
        Call<GithubUsers> call = apiService.getUser(newString);
        call.enqueue(new Callback<GithubUsers>() {
            @Override
            public void onResponse(Call<GithubUsers> call, Response<GithubUsers> response) {
                ImageDownloader task = new ImageDownloader();
                if (response.body() == null) {
                    usernameTV.setText("No user found");
                    ownedreptbtn.setVisibility(View.GONE);
                    imageView.setVisibility(View.GONE);
                    followers.setVisibility(View.GONE);
                    following.setVisibility(View.GONE);
                    email.setVisibility(View.GONE);
                } else {
                    try {
                        myimag = task.execute(response.body().getImageView()).get();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (ExecutionException e) {
                        e.printStackTrace();
                    }
                    imageView.setImageBitmap(myimag);
                    imageView.getLayoutParams().height = 220;
                    imageView.getLayoutParams().width = 220;

                    if (response.body().getName() == null) {
                        usernameTV.setText("No name provided");
                    } else {
                        usernameTV.setText("Username: " + response.body().getName());
                    }
                    followers.setText("Followers: " + response.body().getFollowers());
                    following.setText("Followers: " + response.body().getFollowing());
                    Login.setText("Followers: " + response.body().getLogin());

                    if (response.body().getEmail() == null) {
                        email.setText("No email provided");
                    } else {
                        email.setText("Email: " + response.body().getEmail());
                    }
                }
            }

            @Override
            public void onFailure(Call<GithubUsers> call, Throwable t) {
                System.out.println("Failed :" + t.toString());
            }
        });
    }

}