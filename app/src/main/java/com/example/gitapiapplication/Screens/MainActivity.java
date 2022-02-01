package com.example.gitapiapplication.Screens;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;


import com.example.gitapiapplication.R;

public class MainActivity extends AppCompatActivity {

    Intent i;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


    }

    public void openUser(View view) {
        i = new Intent(MainActivity.this, UserActivity_Main.class);
        startActivity(i);
    }

    public void openIssues(View view) {
        i = new Intent(MainActivity.this, IssuesScreen.class);
        startActivity(i);
    }

}