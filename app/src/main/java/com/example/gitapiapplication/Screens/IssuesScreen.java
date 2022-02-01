package com.example.gitapiapplication.Screens;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.Activity;
import android.app.ProgressDialog;
import androidx.lifecycle.LifecycleOwner;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.gitapiapplication.R;
import com.example.gitapiapplication.Viewmodel.ListIssuesViewModel;
import com.example.gitapiapplication.adapter.DataAdapter;
import com.example.gitapiapplication.entities.Issue;
import androidx.lifecycle.ViewModelProvider;


import java.util.List;

public class IssuesScreen extends AppCompatActivity {

    private final String TAG = IssuesScreen.class.getName();

    private ProgressDialog progressDialog;
    private DataAdapter dataAdapter;
    private EditText searchEditText;
    private ListIssuesViewModel viewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_issues_screen);
        viewModel = new ViewModelProvider(IssuesScreen.this).get(ListIssuesViewModel.class);
        setupView();
        searchEditText.setOnEditorActionListener((TextView v, int actionId, KeyEvent event) -> {
            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                  String repo = searchEditText.getText().toString();
                  if (repo.length() > 0) {
                      String[] query = repo.split("/");
                      if (query.length == 2) {
                          hideSoftKeyboard(IssuesScreen.this, v);
                          setProgress(true);
                          viewModel.loadIssues(query[0],query[1]);
                      } else {
                          handleError(new Exception(
                                  "Error wrong format of input. Required format owner/repository_name")
                          );
                      }
                  } else {
                      handleError(new Exception(
                              "Repository name empty. Required format owner/repository_name")
                      );
                  }
                return true;
            }
            return false;
        });

        // Handle changes emitted by LiveData
        viewModel.getApiResponse().observe((LifecycleOwner) IssuesScreen.this, apiResponse -> {
            Log.d(TAG, "observe called()");
            if (apiResponse.getError() != null) {
                handleError(apiResponse.getError());
            } else {
                handleResponse(apiResponse.getIssues());
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private void setupView() {
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        searchEditText = (EditText) findViewById(R.id.et_search);

        // Setup Progress Dialog to show loading state
        progressDialog = new ProgressDialog(IssuesScreen.this);
        progressDialog.setIndeterminate(true);
        progressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        progressDialog.setTitle(getString(R.string.progress_title));
        progressDialog.setMessage(getString(R.string.progress_body));
        progressDialog.setCancelable(false);
        progressDialog.setCanceledOnTouchOutside(false);

        recyclerView.setRecycledViewPool(new RecyclerView.RecycledViewPool());
        recyclerView.setLayoutManager(new LinearLayoutManager(
                this, LinearLayoutManager.VERTICAL, false)
        );
        recyclerView.hasFixedSize();
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        DividerItemDecoration mDividerItemDecoration = new DividerItemDecoration(
                recyclerView.getContext(), LinearLayoutManager.VERTICAL
        );
        recyclerView.addItemDecoration(mDividerItemDecoration);
        dataAdapter = new DataAdapter(getLayoutInflater());
        recyclerView.setAdapter(dataAdapter);
    }

    private void hideSoftKeyboard(Activity activity, View view) {
        InputMethodManager imm = (InputMethodManager) activity.getSystemService(
                Context.INPUT_METHOD_SERVICE
        );
        if (imm != null) {
            imm.hideSoftInputFromWindow(view.getApplicationWindowToken(), 0);
        }
    }

    private void handleResponse(List<Issue> issues) {
        setProgress(false);
        if (issues != null && issues.size() > 0) {
            dataAdapter.addIssues(issues);
        } else {
            dataAdapter.clearIssues();
            Toast.makeText(
                    this,
                    "No issues found for the searched repository.",
                    Toast.LENGTH_SHORT
            ).show();
        }
    }

    private void handleError(Throwable error) {
        setProgress(false);
        dataAdapter.clearIssues();
        Log.e(TAG, "error occured: " + error.toString());
        Toast.makeText(this, "Oops! Some error occured.", Toast.LENGTH_SHORT).show();
    }

    public void setProgress(boolean flag) {
        if (flag) {
            progressDialog.show();
        } else {
            progressDialog.dismiss();
        }
    }

}
