package com.android.androidcoroutinedemokotlin.models

data class RecyclerList(val items: ArrayList<RecyclerData>)
data class RecyclerData(val name : String, val description: String,  val avatar_url: String, val login: String,  val id: Int,val title:String,val user:User)
data class Owner(
    val avatar_url: String,
    val events_url: String,
    val followers_url: String,
    val following_url: String,
    val gists_url: String,
    val gravatar_id: String,
    val html_url: String,
    val id: Int,
    val login: String,
    val node_id: String,
    val organizations_url: String,
    val received_events_url: String,
    val repos_url: String,
    val site_admin: Boolean,
    val starred_url: String,
    val subscriptions_url: String,
    val type: String,
    val url: String
)
data class User(
    val login: String,
    val avatar_url: String
)