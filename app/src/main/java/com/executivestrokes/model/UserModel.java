package com.executivestrokes.model;


import com.google.gson.annotations.SerializedName;

public class UserModel {

    @SerializedName("login")
    private String login;

    @SerializedName("name")
    private String name;


    @SerializedName("public_repos")
    private int public_repos;

    @SerializedName("avatar_url")
    private String avatar;

    public UserModel(String email,
                      String avatar,
                      int public_repos,
                      String name,
                      String login) {
        this.setAvatar(avatar);
        this.setPublic_repos(public_repos);
        this.setName(name);
        this.setLogin(login);
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPublic_repos() {
        return public_repos;
    }

    public void setPublic_repos(int public_repos) {
        this.public_repos = public_repos;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

}
