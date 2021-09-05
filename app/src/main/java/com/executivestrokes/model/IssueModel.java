package com.executivestrokes.model;

import com.google.gson.annotations.SerializedName;

public class IssueModel {

    @SerializedName("body")
    private String body;

    public IssueModel(String body) {
        this.setBody(body);
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
