package com.sarveshhon.gitapi;

import static com.sarveshhon.gitapi.Helper.API_USER;
import static com.sarveshhon.gitapi.Helper.blackIconStatusBar;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.sarveshhon.gitapi.databinding.ActivityIntroBinding;

import org.json.JSONObject;

public class IntroActivity extends AppCompatActivity {

    // Activity binding for Views
    ActivityIntroBinding binding;

    // Username as static use in app
    public static String USERNAME;

    // API url declaration
    String api_url;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityIntroBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // set Statusbar color
        blackIconStatusBar(IntroActivity.this, R.color.white_grey_lite);

        // Check Username Button onClick
        binding.btnVerifyUsername.setOnClickListener(v -> {
            if (!binding.etUsername.getText().toString().isEmpty()) {
                checkUsername(binding.etUsername.getText().toString().replace(" ", ""));
            } else {
                binding.etUsername.setError("Enter Valid Username");
            }
        });

    }

    // Check Username Method Definition
    private void checkUsername(String _username) {

        // API Initialization
        api_url = API_USER + "/" + _username;

        // API Request Call
        StringRequest request = new StringRequest(Request.Method.GET, api_url, response -> {

            try {

                JSONObject object = new JSONObject(response);

                // Checks if username exists
                if (object.getString("login").equals(_username)) {
                    USERNAME = "/" + object.getString("login");
                    startActivity(new Intent(this, MainActivity.class)
                            .putExtra("username", "/" + object.getString("login")));
                } else {
                    Toast.makeText(this, "Something went wrong\nTry Again!1", Toast.LENGTH_SHORT).show();
                }

            } catch (Exception e) {
                Toast.makeText(this, "Something went wrong\nTry Again!2", Toast.LENGTH_SHORT).show();
                Log.d("MyError", e.getMessage());
            }

        }, error -> {
            binding.etUsername.setError("Username Not Found");
        });

        // Adds Requests to Queue
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(request);

    }

}