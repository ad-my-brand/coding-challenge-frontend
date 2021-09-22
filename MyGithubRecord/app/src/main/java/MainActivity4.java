package com.example.mygithubrecord;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.mygithubrecord.model.GitHubUser;
import com.example.mygithubrecord.rest.APIClient;
import com.example.mygithubrecord.rest.GitHubUserEndPoints;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity4 extends AppCompatActivity {
    TextView username,email,following,followers;
    Button findRepos;
    ImageView imageView;
    Bundle bundle;
    String newString;
    Bitmap bitmap;
    Bitmap myImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main4);

        username=findViewById(R.id.userName);
        email=findViewById(R.id.email);
        following=findViewById(R.id.following);
        followers=findViewById(R.id.followers);
        findRepos=findViewById(R.id.findRepos);
        imageView=findViewById(R.id.imageView);

        bundle=getIntent().getExtras();
        newString=bundle.getString("usernameString");

        findRepos.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity4.this,Repositories.class);
                intent.putExtra("username", newString);
                startActivity(intent);
            }
        });
        loadData();
    }

    public class ImageDownloader extends AsyncTask<String, Void, Bitmap> {
        @Override
        protected Bitmap doInBackground(String... urls) {
            try {
                URL url = new URL(urls[0]);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.connect();
                InputStream inputStream = connection.getInputStream();
                Bitmap myBitmap = BitmapFactory.decodeStream(inputStream);
                return myBitmap;

            } catch (MalformedURLException e) {
                e.printStackTrace();

            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
    }

    public void loadData() {
        final GitHubUserEndPoints apiService=APIClient.getClient().create(GitHubUserEndPoints.class);

        Call<GitHubUser> call=apiService.getUser(newString);
        call.enqueue(new Callback<GitHubUser>()
        {
            @Override
            public void onResponse(Call<GitHubUser> call, Response<GitHubUser> response)
            {
                ImageDownloader task=new ImageDownloader();
                try {
                    myImage = task.execute(response.body().getAvatar()).get();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                imageView.setImageBitmap(myImage);
                imageView.getLayoutParams().height=220;
                imageView.getLayoutParams().width=220;
                if(response.body().getName() == null){
                    username.setText("No Username provided.");
                }
                else
                {
                    username.setText(response.body().getName());
                }
                followers.setText(response.body().getFollowers());
                following.setText(response.body().getFollowing());
                //logIn.setText("LogIn: " + response.body().getLogin());
                if(response.body().getEmail() == null)
                {
                    email.setText("No E-mail provided.");
                }
                else
                {
                    email.setText(response.body().getEmail());
                }
            }
            @Override
            public void onFailure(Call<GitHubUser> call, Throwable t) {
                System.out.println("Failed!" + t.toString());
            }
        });
    }
}