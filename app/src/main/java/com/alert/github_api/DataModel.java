package com.alert.github_api;

public class DataModel {
    String repo_name,repo_description,issues_url;
    boolean is_forked;
    public DataModel(String repo_name, String repo_description, String issues_url,boolean is_forked){
        this.repo_name = repo_name;
        this.repo_description = repo_description;
        this.issues_url = issues_url;
        this.is_forked = is_forked;
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
    public boolean get_is_forked(){
        return is_forked;
    }
}
