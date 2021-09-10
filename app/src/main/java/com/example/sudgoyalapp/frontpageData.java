package com.example.sudgoyalapp;

public class frontpageData {
    private String Repos,Gists,Followers,Following,Email,Img;

    public frontpageData(){

    };

    public frontpageData(String img, String repos, String gists, String followers, String following, String email) {
        Repos = repos;
        Gists = gists;
        Followers = followers;
        Following = following;
        Email = email;
        Img = img;
    }

    public String getImg() {
        return Img;
    }

    public void setImg(String img) {
        Img = img;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getRepos() {
        return Repos;
    }

    public void setRepos(String repos) {
        Repos = repos;
    }

    public String getGists() {
        return Gists;
    }

    public void setGists(String gists) {
        Gists = gists;
    }

    public String getFollowers() {
        return Followers;
    }

    public void setFollowers(String followers) {
        Followers = followers;
    }

    public String getFollowing() {
        return Following;
    }

    public void setFollowing(String following) {
        Following = following;
    }
}
