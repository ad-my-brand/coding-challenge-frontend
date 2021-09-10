package com.example.sudgoyalapp;

public class IssueData {
    String Issue;
    String Detail;
    String HtmlUrl;

    public IssueData(){

    }

    public IssueData(String issue, String detail, String htmlUrl) {
        Issue = issue;
        Detail = detail;
        HtmlUrl = htmlUrl;
    }

    public String getHtmlUrl() {
        return HtmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        HtmlUrl = htmlUrl;
    }

    public String getIssue() {
        return Issue;
    }

    public void setIssue(String issue) {
        Issue = issue;
    }

    public String getDetail() {
        return Detail;
    }

    public void setDetail(String detail) {
        Detail = detail;
    }
}
