package com.example.sudgoyalapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class IssueDisplay extends AppCompatActivity {

    TextView Details;
    TextView GoTo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_issue_display);

        Details = findViewById(R.id.Details);
        GoTo = findViewById(R.id.issueweb);

        Bundle extras = getIntent().getExtras();
        String IssueDetail = extras.getString("IssueDetail");
        String htmlurl = extras.getString("HTMLURL");

        Details.setText(IssueDetail);

        GoTo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                //TODO: Navigate to github in chrome
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(htmlurl));
                startActivity(Intent.createChooser(intent, "Open with"));
            }
        });
    }
}