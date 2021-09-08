package com.codechakra.usergitrepository.activities;

import androidx.appcompat.app.AppCompatActivity;


import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.codechakra.usergitrepository.GithubApiService;
import com.codechakra.usergitrepository.R;
import com.codechakra.usergitrepository.models.Users;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {


    ImageView avatar_image;        //to show user's avatar image

    TextView username_textview;   //show username of user

    EditText usernameText;        //to get username

    public TextView git_history_textview; //to show user's git history
    Button getList_bt;                    // button to get list of user's repositories
    Button getUserGitHistory_bt;          // button to get user's git history


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        avatar_image = findViewById(R.id.imageView);
        usernameText = findViewById(R.id.Login_id_et);
        username_textview = findViewById(R.id.login_id);
        git_history_textview = findViewById(R.id.git_history_textview);
        getList_bt = findViewById(R.id.get_list_of_repos);
        getUserGitHistory_bt = findViewById(R.id.button_get);
        getUserGitHistory_bt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = usernameText.getText().toString();
                if (!username.isEmpty()) {
                    getUserHistory(username);

                } else {
                    Toast.makeText(MainActivity.this, "Please enter github username", Toast.LENGTH_SHORT).show();
                }

            }
        });


    }

    //Using this method we get user's github history
    public void getUserHistory(String username) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.github.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        GithubApiService githubApiService = retrofit.create(GithubApiService.class);
        Call<Users> userinfo = githubApiService.getUserHistory(username);
        userinfo.enqueue(new Callback<Users>() {
            @Override
            public void onResponse(Call<Users> call, Response<Users> response) {
                if (!response.isSuccessful()) {
                    String textResponse = "Code :" + response.code();
                    avatar_image.setVisibility(View.INVISIBLE);
                    username_textview.setVisibility(View.INVISIBLE);
                    git_history_textview.setText(textResponse);

                    return;
                }
                Users users = response.body();
                if (users != null) {
                    Glide.with(getApplicationContext()).load(users.getAvatar_url()).into(avatar_image);
                    username_textview.setText(users.getLogin());
                    StringBuilder userInfo = new StringBuilder();

                    userInfo.append("Name : ").append(users.getName()).append("\n");
                    userInfo.append("Bio : ").append(users.getBio()).append("\n");
                    userInfo.append("Blog : ").append(users.getBio()).append("\n");
                    userInfo.append("Company : ").append(users.getCompany()).append("\n");
                    userInfo.append("Email : ").append(users.getEmail()).append("\n");
                    userInfo.append("Is hireable : ").append(users.isHireable()).append("\n");
                    userInfo.append("Location : ").append(users.getLocation()).append("\n");
                    userInfo.append("Created at : ").append(users.getCreated_at()).append("\n");
                    userInfo.append("Updated at : ").append(users.getUpdated_at()).append("\n");
                    userInfo.append("Public repositories : ").append(users.getPublic_repos()).append("\n");
                    userInfo.append("Followers : ").append(users.getFollowers()).append("\n");
                    userInfo.append("Following : ").append(users.getFollowing()).append("\n");


                    git_history_textview.setText(userInfo);
                    avatar_image.setVisibility(View.VISIBLE);
                    username_textview.setVisibility(View.VISIBLE);
                    getList_bt.setVisibility(View.VISIBLE);
                    getList_bt.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            Intent intent = new Intent(getBaseContext(), RepoActivity.class);
                            intent.putExtra("login_id", users.getLogin());
                            startActivity(intent);
                        }
                    });

                }
            }

            @Override
            public void onFailure(Call<Users> call, Throwable t) {
                String message = "something went wrong";
                avatar_image.setVisibility(View.INVISIBLE);
                username_textview.setVisibility(View.INVISIBLE);
                git_history_textview.setText(message);

            }
        });

    }


}