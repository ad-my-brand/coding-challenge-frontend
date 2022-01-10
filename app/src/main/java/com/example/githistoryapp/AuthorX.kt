package com.example.githistoryapp
import com.google.gson.annotations.SerializedName

data class AuthorX(
    @SerializedName("date")
    val date: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("name")
    val name: String
)