package com.example.github.models

data class User (
    var name: String?,
    var login: String?,
    var avatar_url: String?,
    var company: String?,
    var location: String?,
    var followers: Int?,
    var following: Int?,
    var public_repos: Int?
)