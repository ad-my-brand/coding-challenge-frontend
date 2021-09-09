package com.example.gitapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    EditText editText;
    Button button;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        editText=findViewById(R.id.username);
        button=findViewById(R.id.button);

    }

    public void onclick(View view) {
        Intent intent = new Intent(MainActivity.this,UserActivity.class);
        intent.putExtra("username",editText.getText().toString());
        startActivity(intent);

    }
}