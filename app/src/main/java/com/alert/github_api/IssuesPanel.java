package com.alert.github_api;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.loader.app.LoaderManager;
import androidx.loader.content.AsyncTaskLoader;
import androidx.loader.content.Loader;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class IssuesPanel extends AppCompatActivity implements LoaderManager.LoaderCallbacks<String> {
    //important variables
    private static String repo_name = "", issue_number = "", username = "";
    //--------------
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.issue_panel);



        Bundle extras = getIntent().getExtras();
        repo_name = extras.getString("repository_name");
        username = extras.getString("username");
        issue_number = extras.getString("issue_number");
        TextView r = (TextView)findViewById(R.id.reps);
        r.setText("Repository name: "+repo_name);
        TextView u = (TextView)findViewById(R.id.user);
        u.setText("Username: "+username);
        TextView i = (TextView)findViewById(R.id.issue_num);
        i.setText("Issue Number: #"+issue_number);

        if(!repo_name.equals("") || !username.equals("") || !issue_number.equals("")){
            //check the internet connection
            ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
            boolean is_Internet_Available = activeNetworkInfo != null && activeNetworkInfo.isConnected();
            if(is_Internet_Available) {
                LoaderManager loaderManager = LoaderManager.getInstance(this);
                loaderManager.initLoader(0, null, this);
            }
        }

    }

    @NonNull
    @Override
    public Loader<String> onCreateLoader(int id, @Nullable Bundle args) {
        return new IssueLoader(this);
    }

    @Override
    public void onLoadFinished(@NonNull Loader<String> loader, String data) {
        String title = "No Data Found" , comments = "0";
        try {

            JSONObject jsonObject = new JSONObject(data);
            title = jsonObject.getString("title");
            comments = jsonObject.getString("comments");

        } catch (Exception ex) {
            Toast.makeText(this,"No Data Found for this issue number!",Toast.LENGTH_LONG).show();
        }

        //fill the UI with relevant data
        TextView current_issue = (TextView)findViewById(R.id.issue_title);
        current_issue.setText(title);

        TextView comment = (TextView)findViewById(R.id.comments);
        comment.setText("Comments: #"+comments);
        //---------------
    }

    @Override
    public void onLoaderReset(@NonNull Loader<String> loader) {

    }

    //crating a class IssueLoader to load issues from the API
    public static class IssueLoader extends AsyncTaskLoader<String>{

        public IssueLoader(@NonNull Context context) {
            super(context);
        }

        @Nullable
        @Override
        public String loadInBackground() {
            String result = "";
            HttpURLConnection httpURLConnection = null;
            InputStream inputStream = null;
            try {

                String url = "https://api.github.com/repos/"+username+"/"+repo_name+"/issues/"+issue_number;
                URL obj = new URL(url);
                httpURLConnection = (HttpURLConnection) obj.openConnection();
                httpURLConnection.setRequestMethod("GET");
                int responseCode = httpURLConnection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) { // success
                    inputStream = httpURLConnection.getInputStream();
                    InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                    BufferedReader in = new BufferedReader(inputStreamReader);
                    String inputLine;
                    StringBuilder response = new StringBuilder();

                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);

                    }
                    result = response.toString();

                } else {
                    Log.i("Err:","Something went wrong!");
                }
            }
            catch(Exception ex){
                ex.printStackTrace();
            }finally {
                if (httpURLConnection != null) {
                    httpURLConnection.disconnect();
                }
                if (inputStream != null) {
                    try {
                        inputStream.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            return result;
        }

        @Override
        public void deliverResult(String data) {
            if (isStarted()) {
                // Deliver result if loader is currently started
                super.deliverResult(data);
            }
        }

        @Override
        protected void onStartLoading() {
            // Start loading
            forceLoad();
        }

        @Override
        protected void onStopLoading() {
            cancelLoad();
        }

        @Override
        protected void onReset() {
            super.onReset();

            // Ensure the loader is stopped
            onStopLoading();
        }
    }
    //----------------------


}
