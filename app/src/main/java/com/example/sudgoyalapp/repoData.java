package com.example.sudgoyalapp;

public class repoData {
    String repoName;
    String gitUrl;

    public repoData(){

    }

    public repoData(String repoName, String gitUrl) {
        this.repoName = repoName;
        this.gitUrl = gitUrl;
    }

    public String getRepoName() {
        return repoName;
    }

    public void setRepoName(String repoName) {
        this.repoName = repoName;
    }

    public String getGitUrl() {
        return gitUrl;
    }

    public void setGitUrl(String gitUrl) {
        this.gitUrl = gitUrl;
    }
}
