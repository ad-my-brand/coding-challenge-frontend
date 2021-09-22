package com.example.mygithubrecord;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegistrationActivity extends AppCompatActivity {

    TextView name,mobileNo,email,password,confirmPassword;
    Button signUp,logIn;
    String regex="^(.+)@(.+)$";
    Pattern pattern= Pattern.compile(regex);
    ProgressDialog progressDialog;
    FirebaseAuth mAuth;
    FirebaseUser mUser;
    DatabaseReference userRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        name=findViewById(R.id.editTextTextPersonName3);
        mobileNo=findViewById(R.id.editTextTextPersonName4);
        email=findViewById(R.id.editTextTextPersonName5);
        password=findViewById(R.id.editTextTextPersonName6);
        confirmPassword=findViewById(R.id.editTextTextPersonName7);

        signUp=findViewById(R.id.button3);
        logIn=findViewById(R.id.button4);
        progressDialog=new ProgressDialog(this);
        mAuth=FirebaseAuth.getInstance();
        userRef= FirebaseDatabase.getInstance().getReference().child("Users");

        String sname=name.getText().toString();
        String smobileNo=mobileNo.getText().toString();
        String semail=email.getText().toString();
        String spassword=password.getText().toString();
        String sconfirmPassword=confirmPassword.getText().toString();

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String sname=name.getText().toString();
                String smobileNo=mobileNo.getText().toString();
                String semail=email.getText().toString();
                String spassword=password.getText().toString();
                String sconfirmPassword=confirmPassword.getText().toString();
                if(TextUtils.isEmpty(sname) || TextUtils.isEmpty(semail) || TextUtils.isEmpty(spassword) ||TextUtils.isEmpty(smobileNo) || TextUtils.isEmpty(sconfirmPassword))
                {
                    Toast.makeText(RegistrationActivity.this, "Please fill all the fields!!", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    PerforAuth();
                }
            }
        });

        logIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(RegistrationActivity.this, LoginActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK|Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        });

    }

    public void PerforAuth()
    {
        String sname=name.getText().toString();
        String smobileNo=mobileNo.getText().toString();
        String semail=email.getText().toString();
        String spassword=password.getText().toString();
        String sconfirmPassword=confirmPassword.getText().toString();
        Matcher matcher=pattern.matcher(semail);
        int a=0;
        if(matcher.matches()==false)
        {
            email.setError("Please enter correct e-mail");
            a++;
        }
        if(sname.length()<3 || sname.length()>15)
        {
            name.setError("Please enter correct Username");
            a++;
        }
        if(smobileNo.length()!=10)
        {
            mobileNo.setError("Please enter correct Mobile No.");
            a++;
        }
        if(spassword.length()<8 || spassword.length()>15)
        {
            password.setError("Password should be 8-15 characters long!!");
            a++;
        }
        if(!spassword.equals(sconfirmPassword))
        {
            password.setError("Password doesn't match!!");
            a++;
        }
        if(a==0)
        {
            progressDialog.setMessage("Please wait while Registration...");
            progressDialog.setTitle("Registration");
            progressDialog.setCanceledOnTouchOutside(false);
            progressDialog.show();
            mAuth.createUserWithEmailAndPassword(semail,spassword).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                @Override
                public void onComplete(@NonNull Task<AuthResult> task) {
                    if(task.isSuccessful())
                    {
                        progressDialog.dismiss();
                        saveData();
                        Intent intent=new Intent(RegistrationActivity.this, LoginActivity.class);
                        Toast.makeText(RegistrationActivity.this,"Registration Successful",Toast.LENGTH_SHORT).show();
                        startActivity(intent);
                    }
                    else
                    {
                        progressDialog.dismiss();
                        Toast.makeText(RegistrationActivity.this,""+task.getException(),Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }

    }
    public void finaliseRegFun()
    {
        Intent intent=new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    public void saveData()
    {
        mUser=mAuth.getCurrentUser();
        String sname=name.getText().toString();
        String smobileNo=mobileNo.getText().toString();
        String semail=email.getText().toString();
        String spassword=password.getText().toString();

        HashMap hashMap=new HashMap();
        hashMap.put("username",sname);
        hashMap.put("mobile",smobileNo);
        hashMap.put("email",semail);
        hashMap.put("password",spassword);

        userRef.child(mUser.getUid()).setValue(hashMap);

    }
}