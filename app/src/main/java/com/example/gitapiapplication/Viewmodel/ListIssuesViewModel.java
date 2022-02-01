package com.example.gitapiapplication.Viewmodel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import androidx.annotation.NonNull;

import com.example.gitapiapplication.res.IssueRepository;
import com.example.gitapiapplication.Dao.IssueRepositoryImpl;
import com.example.gitapiapplication.entities.ApiResponse;

public class ListIssuesViewModel extends ViewModel {

    private MediatorLiveData<ApiResponse> apiResponse;
    private IssueRepository issueRepository;

    public ListIssuesViewModel() {
        apiResponse = new MediatorLiveData<>();
        issueRepository = new IssueRepositoryImpl();
    }

    @NonNull
    public LiveData<ApiResponse> getApiResponse() {
        return apiResponse;
    }

    public void loadIssues(@NonNull String user, String repo) {
        LiveData<ApiResponse> issuesSource = issueRepository.getIssues(user, repo);
        apiResponse.addSource(
                issuesSource,
                apiResponse -> {
                    if (this.apiResponse.hasActiveObservers()) {
                        this.apiResponse.removeSource(issuesSource);
                    }
                    this.apiResponse.setValue(apiResponse);
                }
        );
    }

}