package com.alert.github_api;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.loader.app.LoaderManager;
import androidx.loader.content.AsyncTaskLoader;
import androidx.loader.content.Loader;

import android.content.Context;
import android.content.Intent;
import android.media.Image;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.StrictMode;
import android.renderscript.ScriptGroup;
import android.util.Log;
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
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import pl.droidsonroids.gif.GifImageView;

public class MainActivity extends AppCompatActivity implements LoaderManager.LoaderCallbacks<String> {
    //important variables
    ArrayList<DataModel> list_of_repository = new ArrayList<>();
    static String username = "";
    int LDR = 0;
    //----------------
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    //method to listen to the button click by user
    public void fetch_repo_info(View view){
        EditText get_the_username = (EditText)findViewById(R.id.get_username);
        username = get_the_username.getText().toString();
        start_the_service(username);//calling the function to start background work
    }
    //------------

    //starter method to fetch data from the API
    private void start_the_service(String username){
        if(!username.equals("")){
            //check the internet connection
            ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
            boolean is_Internet_Available = activeNetworkInfo != null && activeNetworkInfo.isConnected();
            if(is_Internet_Available) {
                LoaderManager loaderManager = LoaderManager.getInstance(this);
                loaderManager.initLoader(LDR, null, this);
                LDR++;
            }
            else{
                GifImageView gifImageView = (GifImageView)findViewById(R.id.gifs);
                gifImageView.setVisibility(View.GONE);
                ImageView imageView = (ImageView)findViewById(R.id.no_internet);
                imageView.setVisibility(View.VISIBLE);
            }
        }
        else{
            ListView listView = (ListView)findViewById(R.id.list_of_repos);
            listView.setVisibility(View.GONE);
            GifImageView gifImageView = (GifImageView)findViewById(R.id.gifs);
            gifImageView.setVisibility(View.GONE);
            ImageView imageView = (ImageView)findViewById(R.id.no_internet);
            imageView.setImageResource(R.drawable.not_found);
            imageView.setVisibility(View.VISIBLE);
        }
    }
    //------------

    //code that will work when user clicks checkTheIssues(View) method
    public void checkTheIssues(View view){
       LinearLayout parent = (LinearLayout)view.getParent();
       LinearLayout grandParent = (LinearLayout)parent.getParent();
       LinearLayout textViewParent = (LinearLayout)grandParent.getChildAt(0);
       TextView textView = (TextView)textViewParent.getChildAt(0);
       EditText editText = (EditText)parent.getChildAt(0);
       String issue_num = editText.getText().toString();
       String repo_name = textView.getText().toString();

       Intent intent = new Intent(this,IssuesPanel.class);
       intent.putExtra("username",username);
       intent.putExtra("repository_name",repo_name);
       intent.putExtra("issue_number",issue_num);
       startActivity(intent);
    }
    //-------------------

    @NonNull
    @Override
    public Loader<String> onCreateLoader(int id, @Nullable Bundle args) {
        return new Repo(this);
    }

    @Override
    public void onLoadFinished(@NonNull Loader<String> loader, String data) {
        //fetching important data from the jsonobject and storing it into an arraylist of objects
        try {
             list_of_repository.clear();
            JSONArray arr = new JSONArray(data);

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
        //----------------------------------

        //adding data to the UI component
        CustomAdapter customAdapter = new CustomAdapter(this, list_of_repository);
        ListView listView = (ListView) findViewById(R.id.list_of_repos);
        //disable visibility of gifimageview's parent
        LinearLayout linearLayout = (LinearLayout)findViewById(R.id.no_data);
        linearLayout.setVisibility(View.GONE);
        //-------------
        listView.setVisibility(View.VISIBLE);
        listView.setAdapter(customAdapter);
        //---------------------

    }

    @Override
    public void onLoaderReset(@NonNull Loader<String> loader) {
         loader = null;
    }

    //Async task loder class to load the required data in background
    public static class Repo extends AsyncTaskLoader<String> {

        public Repo(@NonNull Context context) {
            super(context);
        }

        @Nullable
        @Override
        public String loadInBackground() {
            String result = "";
            HttpURLConnection httpURLConnection = null;
            InputStream inputStream = null;
            try {
                String url = "https://api.github.com/users/" + username + "/repos";
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
                    result = String.valueOf(response);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            } finally {
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

}