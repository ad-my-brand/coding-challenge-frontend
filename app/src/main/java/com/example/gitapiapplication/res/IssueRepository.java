package com.example.gitapiapplication.res;

import androidx.lifecycle.LiveData;

import com.example.gitapiapplication.entities.ApiResponse;
public interface IssueRepository {

    LiveData<ApiResponse> getIssues(String owner, String repo);
}

