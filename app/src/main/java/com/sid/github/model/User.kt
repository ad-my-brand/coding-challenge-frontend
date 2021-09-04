package com.sid.github.model

import com.google.gson.annotations.SerializedName

class User {
    @SerializedName("avatar_url") var uAvatar:String? = null
    @SerializedName("name") var uName:String? = null
    @SerializedName("bio") var uBio:String? = null
    @SerializedName("followers") var uFollowers:String? = null
    @SerializedName("following") var uFollowing:String? = null
    @SerializedName("created_at") var uCreatedAt:String? = null
    @SerializedName("public_repos") var uPublicRepos:String? = null
    @SerializedName("repos_url") var uRepoURL:String? = null
    @SerializedName("html_url") var uHtmlURL:String? = null

    init {
        setAvatar(uAvatar)
        setName(uName)
        setBio(uBio)
        setFollowers(uFollowers)
        setFollowing(uFollowing)
        setJoined(uCreatedAt)
        setRepos(uPublicRepos)
        setRepoLink(uRepoURL)
        setHtmlLink(uHtmlURL)
    }

    fun getAvatar(): String? {
        return uAvatar
    }

    private fun setAvatar(avatar: String?) {
        this.uAvatar = avatar
    }

    fun getName(): String? {
        return uName
    }

    private fun setName(name: String?) {
        this.uName = name
    }

    fun getBio(): String? {
        return uBio
    }

    private fun setBio(bio: String?) {
        this.uBio = bio
    }

    fun getFollowers(): String? {
        return uFollowers
    }

    private fun setFollowers(followers: String?) {
        this.uFollowers = followers
    }

    fun getFollowing(): String? {
        return uFollowing
    }

    private fun setFollowing(following: String?) {
        this.uFollowing = following
    }

    fun getJoined(): String? {
        return uCreatedAt
    }

    private fun setJoined(joined: String?) {
        this.uCreatedAt = joined
    }

    fun getRepos(): String? {
        return uPublicRepos
    }

    private fun setRepos(repo: String?) {
        this.uPublicRepos = repo
    }

    fun getRepoLink(): String? {
        return uFollowing
    }

    private fun setRepoLink(following: String?) {
        this.uFollowing = following
    }

    fun getHtmlLink(): String? {
        return uFollowing
    }

    private fun setHtmlLink(following: String?) {
        this.uFollowing = following
    }

}
