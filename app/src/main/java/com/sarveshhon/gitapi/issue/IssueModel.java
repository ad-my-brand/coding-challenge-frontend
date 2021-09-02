package com.sarveshhon.gitapi.issue;

public class IssueModel {

    String title;
    String state;
    int number;
    String created_by;
    String created_at;
    String html_url;

    public IssueModel() {

    }

    public IssueModel(String title, String state, int number, String created_by, String created_at, String html_url) {
        this.title = title;
        this.state = state;
        this.number = number;
        this.created_by = created_by;
        this.created_at = created_at;
        this.html_url = html_url;
    }

    public String getHtml_url() {
        return html_url;
    }

    public String getTitle() {
        return title;
    }

    public String getState() {
        return state;
    }

    public int getNumber() {
        return number;
    }

    public String getCreated_by() {
        return created_by;
    }

    public String getCreated_at() {
        return created_at;
    }
}
