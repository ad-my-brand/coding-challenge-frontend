package com.executivestrokes.githubreposissues;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    EditText userN;
    CardView userButton;
    String mUserName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        userN=findViewById(R.id.input_username);
        userButton=findViewById(R.id.cardViewButton);

        userButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (TextUtils.isEmpty(userN.getText().toString()))
                {
                    Toast.makeText(MainActivity.this, "Field is Empty", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    mUserName=userN.getText().toString();
                    Intent intent = new Intent(MainActivity.this,UserActivity.class);
                    intent.putExtra("username", mUserName);
                    startActivity(intent);
                }
            }
        });




    }
}