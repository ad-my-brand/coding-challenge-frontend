package model;

import com.google.gson.annotations.SerializedName;

public class GitHubRepo {
    @SerializedName("name")
    private String name;

    @SerializedName("description")
    private String description;

    @SerializedName("language")
    private String language;

    public GitHubRepo(String name,String description,String language){
        this.name = name;
        this.description = description;
        this.language = language;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getLanguage() {
        return language;
    }

}
