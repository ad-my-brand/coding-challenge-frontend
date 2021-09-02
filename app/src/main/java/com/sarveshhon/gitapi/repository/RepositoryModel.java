package com.sarveshhon.gitapi.repository;

public class RepositoryModel {

    String name;
    String description;
    String created_at;
    int forks_count;
    int watchers_count;
    int open_issues_count;
    String avatar;
    String html_url;

    public RepositoryModel() {

    }

    public String getHtml_url() {
        return html_url;
    }

    public RepositoryModel(String name, String description, String created_at, int forks_count, int watchers_count, int open_issues_count, String avatar, String html_url) {
        this.name = name;
        this.description = description;
        this.created_at = created_at;
        this.forks_count = forks_count;
        this.watchers_count = watchers_count;
        this.open_issues_count = open_issues_count;
        this.avatar = avatar;
        this.html_url = html_url;
    }

    public String getCreated_at() {
        return created_at;
    }

    public String getAvatar() {
        return avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description == "null" ? "Description\nNot Found" : description ;
    }

    public int getForks_count() {
        return forks_count;
    }

    public int getWatchers_count() {
        return watchers_count;
    }

    public int getOpen_issues_count() {
        return open_issues_count;
    }
}
