package com.alert.github_api;

import android.os.Bundle;
import android.os.StrictMode;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class IssuesPanel extends AppCompatActivity {
    private static final String USER_AGENT = "Mozilla/5.0";
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
        String repo_name = extras.getString("repository_name");
        String username = extras.getString("username");
        String issue_number = extras.getString("issue_number");
        TextView r = (TextView)findViewById(R.id.reps);
        r.setText("Repository name: "+repo_name);
        TextView u = (TextView)findViewById(R.id.user);
        u.setText("Username: "+username);
        TextView i = (TextView)findViewById(R.id.issue_num);
        i.setText("Issue Number: #"+issue_number);
        fetch_issue(username,repo_name,issue_number);

    }

    public void fetch_issue(String username,String repo_name,String issue_number){
        String title = "",comments = "";
        try {
            
            String url = "https://api.github.com/repos/"+username+"/"+repo_name+"/issues/"+issue_number;
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("User-Agent", USER_AGENT);
            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // success
                BufferedReader in = new BufferedReader(new InputStreamReader(
                        con.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);

                }
                in.close();

                try {

                    JSONObject jsonObject = new JSONObject(response.toString());
                    title = jsonObject.getString("title");
                    comments = jsonObject.getString("comments");

                } catch (Exception ex) {
                    Toast.makeText(getApplicationContext(),String.valueOf(ex),Toast.LENGTH_LONG).show();
                }
            } else {
                Toast.makeText(getApplicationContext(), "Something Went Wrong!", Toast.LENGTH_SHORT).show();
            }
        }
        catch(Exception ex){
            Toast.makeText(getApplicationContext(),String.valueOf(ex),Toast.LENGTH_LONG).show();
        }

        TextView current_issue = (TextView)findViewById(R.id.issue_title);
        current_issue.setText(title);

        TextView comment = (TextView)findViewById(R.id.comments);
        comment.setText("Comments: #"+comments);

    }
}
