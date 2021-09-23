package com.alert.github_api;

public class DataModel {
    String repo_name,repo_description,issues_url;
    boolean access;
    public DataModel(String repo_name, String repo_description, String issues_url,boolean access){
        this.repo_name = repo_name;
        this.repo_description = repo_description;
        this.issues_url = issues_url;
        this.access = access;
    }
    public String getRepo_name(){
        return repo_name;
    }
    public String getRepo_description(){
        return repo_description;
    }
    public String getIssues_url(){
        return issues_url;
    }
    public boolean get_access(){
        return access;
    }
}
