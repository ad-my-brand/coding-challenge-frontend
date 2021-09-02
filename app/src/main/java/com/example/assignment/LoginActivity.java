package com.example.assignment;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {
    private Button logIn;
    public EditText inputUserName;

    private Intent i;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        logIn = (Button) findViewById(R.id.btn_login);
        inputUserName = (EditText) findViewById(R.id.input_username);

    }

    public void getUser(View view) {

        if(userNameIsValid(inputUserName.getText().toString())) {
            i = new Intent(LoginActivity.this, UserActivity.class);
            i.putExtra("STRING_I_NEED", inputUserName.getText().toString());
            startActivity(i);
        }
        else{
            Toast.makeText(this, "Please enter a username", Toast.LENGTH_LONG).show();
        }
    }

    public static boolean userNameIsValid(String username){
        if(username.equals(""))return false;
        return true;
    }

}
