package com.executivestrokes.githubreposissues;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.executivestrokes.RestApi.RetrofitCall;
import com.executivestrokes.RestApi.UserInterface;
import com.executivestrokes.model.UserModel;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserActivity extends AppCompatActivity {
    ImageView avatarImg;
    TextView userName;
    TextView totRepos;
    TextView logIn;
    CardView ownedrepos;
    Bundle extras;
    String userNameOwner;
    Bitmap myImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);
        avatarImg = (ImageView) findViewById(R.id.avatar);
        userName = (TextView) findViewById(R.id.username);
        totRepos = (TextView) findViewById(R.id.public_repos);
        logIn = (TextView) findViewById(R.id.logIn);
        ownedrepos = (CardView) findViewById(R.id.cardViewReposButton);
        extras = getIntent().getExtras();
        userNameOwner = extras.getString("username");
        System.out.println(userNameOwner);
        loadData();
        ownedrepos.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(UserActivity.this,RepoActivity.class);
                intent.putExtra("username", userNameOwner);
                startActivity(intent);
            }
        });
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
        //Instance of interface
        UserInterface UserInterface= RetrofitCall.getUserInfo().create(UserInterface.class);
        if(userNameOwner!=null)
        {
            Call<UserModel> call = UserInterface.getUser(userNameOwner);
            call.enqueue(new Callback<UserModel>() {

                @Override
                public void onResponse(Call<UserModel> call, Response<UserModel>
                        response) {

                    ImageDownloader task = new ImageDownloader();
                    if (response.isSuccessful())
                    {
                        try {
                            myImage = task.execute(response.body().getAvatar()).get();

                        } catch (Exception e) {

                            e.printStackTrace();

                        }

                        avatarImg.setImageBitmap(myImage);
                        avatarImg.getLayoutParams().height=220;
                        avatarImg.getLayoutParams().width=220;

                        if(response.body().getName() == null){
                            userName.setText("No name provided");
                        } else {
                            userName.setText("Username: " + response.body().getName());
                        }

                        totRepos.setText("Public Repository: " + response.body().getPublic_repos());
                        logIn.setText("LogIn: " + response.body().getLogin());
                    }
                    else
                    {
                        ownedrepos.setEnabled(false);
                        Toast.makeText(UserActivity.this,"Error ! User Not Found...",Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<UserModel> call, Throwable t) {
                    System.out.println("Failed!" + t.toString());
                }
            });
        }
        else
        {
            ownedrepos.setEnabled(false);
            Toast.makeText(UserActivity.this,"Error ! Getting User...",Toast.LENGTH_SHORT).show();
        }

    }
}

