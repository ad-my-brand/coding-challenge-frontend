package com.executivestrokes.model;

import com.google.gson.annotations.SerializedName;

public class RepoModel {

    @SerializedName("name")
    private String name;

    @SerializedName("description")
    private String description;

    @SerializedName("open_issues")
    private int open_issues;

    public RepoModel(
            String description,
            String name,int open_issues) {


        this.setDescription(description);
        this.setName(name);
        this.setOpen_issues(open_issues);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOpen_issues() {
        return open_issues;
    }

    public void setOpen_issues(int open_issues) {
        this.open_issues = open_issues;
    }

}

