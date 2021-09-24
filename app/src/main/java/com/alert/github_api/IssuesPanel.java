package com.alert.github_api;

import android.os.Bundle;
import android.os.StrictMode;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import org.w3c.dom.Text;

public class IssuesPanel extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.issue_panel);

        //allow network on main thread
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        //-------------------------

        Bundle extras = getIntent().getExtras();
        TextView r = (TextView)findViewById(R.id.reps);
        r.setText(extras.getString("repository_name"));
        TextView u = (TextView)findViewById(R.id.user);
        u.setText(extras.getString("username"));

    }
}
