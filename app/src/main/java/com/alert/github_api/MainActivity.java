package com.alert.github_api;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import pl.droidsonroids.gif.GifImageView;

public class MainActivity extends AppCompatActivity {
    private static final String USER_AGENT = "Mozilla/5.0";
    //important variables
    ArrayList<DataModel> list_of_repository;
    String username;
    //----------------
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //allow network on main thread
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        //-------------------------

    }
    public String is_valid_username(){
        EditText user = (EditText)findViewById(R.id.get_username);
        String username = user.getText().toString();
        if(username.equals("")){
            return "";
        }
        return username;
    }

    public void checkTheIssues(View v){

        LinearLayout parentRow = (LinearLayout) v.getParent();
        LinearLayout grandParentRow = (LinearLayout)parentRow.getParent();
        ListView listView = (ListView) grandParentRow.getParent();
        final int position = listView.getPositionForView(parentRow);
        //Toast.makeText(this,String.valueOf(position),Toast.LENGTH_LONG).show();
        DataModel dm = list_of_repository.get(position);
        String repository_name = dm.getRepo_name();

        Intent intent = new Intent(this,IssuesPanel.class);
        intent.putExtra("username",username);
        intent.putExtra("repository_name",repository_name);
        startActivity(intent);
    }

    public void fetch_repo_info(View view){
        //disable the initial container
        LinearLayout linearLayout = (LinearLayout)findViewById(R.id.no_data);
        linearLayout.setVisibility(View.GONE);
        GifImageView gif = (GifImageView)findViewById(R.id.gifs);
        //-----------
        username = is_valid_username();
        if(!username.equals("")) {
            list_of_repository = new ArrayList<>();
            try {
                int flag = 0;
                String url = "https://api.github.com/users/"+username+"/repos";
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

                        JSONArray arr = new JSONArray(response.toString());

                        for(int i=0;i<arr.length();i++){
                            JSONObject jsonObject = arr.getJSONObject(i);
                            String title = jsonObject.getString("name");
                            String description = jsonObject.getString("description");
                            if(description.equals("null")){
                                description = "No description provided.";
                            }
                            boolean fork = Boolean.parseBoolean(jsonObject.getString("fork"));
                            list_of_repository.add(new DataModel(title,description,"",fork));
                        }


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

            CustomAdapter customAdapter = new CustomAdapter(this, list_of_repository);
            ListView listView = (ListView) findViewById(R.id.list_of_repos);
            listView.setVisibility(View.VISIBLE);
            listView.setAdapter(customAdapter);

        }
        else{

            linearLayout.setVisibility(View.VISIBLE);
            gif.setVisibility(View.GONE);
            ImageView imgView = (ImageView)findViewById(R.id.not_found);
            imgView.setVisibility(View.VISIBLE);
        }
    }
}