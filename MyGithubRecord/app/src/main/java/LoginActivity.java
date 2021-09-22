package com.example.mygithubrecord;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
//import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LoginActivity extends AppCompatActivity {

    TextView email,password;
    Button logIn,google,facebook,signUp;
    String regex="^(.+)@(.+)$";
    Pattern pattern= Pattern.compile(regex);
    ProgressDialog progressDialog;
    FirebaseAuth mAuth;
    FirebaseUser mUser;
    CheckBox checkBox;
    SharedPreferences sharedPreferences;
    SharedPreferences.Editor editor;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        email=findViewById(R.id.editTextTextPersonName);
        password=findViewById(R.id.editTextTextPersonName2);
        logIn=findViewById(R.id.button5);
        signUp=findViewById(R.id.button8);
        checkBox=findViewById(R.id.checkBox);

        SharedPreferences sharedPreferences;
        final SharedPreferences.Editor editor;
        final int[] autoSave = new int[1];

        sharedPreferences=getSharedPreferences("LoginPrefs",MODE_PRIVATE);
        sharedPreferences=getSharedPreferences("autoLogin", Context.MODE_PRIVATE);
        editor=sharedPreferences.edit();

        int j=sharedPreferences.getInt("keyy",0);
        if(j>0)
        {
            Intent intent1=new Intent(LoginActivity.this,MainActivity3.class);
            intent1.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent1);
        }

        String mailnew=sharedPreferences.getString("emailnew","");
        String passwordnew=sharedPreferences.getString("passwordnew","");

        email.setText(mailnew);
        password.setText(passwordnew);

        String semail=email.getText().toString();
        String spassword=password.getText().toString();

        progressDialog=new ProgressDialog(this);
        mAuth=FirebaseAuth.getInstance();
        mUser=mAuth.getCurrentUser();

        if(checkBox.isChecked())
        {
            Toast.makeText(LoginActivity.this, "Checked!!", Toast.LENGTH_SHORT).show();
        }

        logIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(checkBox.isChecked())
                {
                    editor.putString("emailnew",email.getText().toString());
                    editor.putString("passwordnew",password.getText().toString());
                    editor.commit();
                }
                else
                {
                    editor.putString("emailnew","");
                    editor.putString("passwordnew","");
                    editor.commit();
                }
                String semail=email.getText().toString();
                String spassword=password.getText().toString();
                Matcher matcher = pattern.matcher(semail);
                if(matcher.matches() == false) {
                    email.setError("Enter correct Email");
                }
                if(spassword.isEmpty() || spassword.length() < 8 || spassword.length() > 15) {
                    password.setError("Enter correct Password!!");
                }
                else
                {
                    progressDialog.setMessage("Please wait while Logging...");
                    progressDialog.setTitle("Login");
                    progressDialog.setCanceledOnTouchOutside(false);
                    progressDialog.show();
                    mAuth.signInWithEmailAndPassword(semail,spassword).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (task.isSuccessful()) {
                                progressDialog.dismiss();
                                loginFunNew();
                                int save=1;
                                editor.putInt("keyy",save);
                                editor.apply();
                                Toast.makeText(LoginActivity.this, "Login Successful", Toast.LENGTH_SHORT).show();
                            } else {
                                progressDialog.dismiss();
                                Toast.makeText(LoginActivity.this, "" + task.getException(), Toast.LENGTH_SHORT).show();
                            }
                        }
                    });
                }
            }
        });

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(LoginActivity.this,RegistrationActivity.class);
                startActivity(intent);
            }
        });

    }

    public void loginFunNew()
    {
        Intent intent=new Intent(this,MainActivity3.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }
}