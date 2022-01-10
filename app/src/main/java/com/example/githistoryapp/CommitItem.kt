package com.example.githistoryapp

import com.google.gson.annotations.SerializedName

data class commitItem(
    @SerializedName("author")
    val author: Author,
    @SerializedName("comments_url")
    val commentsUrl: String,
    @SerializedName("commit")
    val commit: CommitX,
    @SerializedName("committer")
    val committer: CommitterX,
    @SerializedName("html_url")
    val htmlUrl: String,
    @SerializedName("node_id")
    val nodeId: String,
    @SerializedName("parents")
    val parents: List<Any>,
    @SerializedName("sha")
    val sha: String,
    @SerializedName("url")
    val url: String
)