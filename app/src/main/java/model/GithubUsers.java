package model;

import com.google.gson.annotations.SerializedName;
public class GithubUsers {


    @SerializedName("login")
    private String login;

    @SerializedName ("name")
    private String name;
    @SerializedName ("followers")
    private String followers;
    @SerializedName ("following")
    private String following;
    @SerializedName ("email")
    private String email;
    @SerializedName ("imageView")
    private String imageView;

    public GithubUsers(String login,String name,String followers,String following,String email,String imageView){
        this.login = login;
        this.name = name;
        this.followers = followers;
        this.following = following;
        this.email = email;
        this.imageView = imageView;

    }

    public String getFollowing() {
        return following;
    }

    public String getImageView() {
        return imageView;
    }

    public String getLogin() {
        return login;
    }

    public String getName() {
        return name;
    }

    public String getFollowers() {
        return followers;
    }

    public String getEmail() {
        return email;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
