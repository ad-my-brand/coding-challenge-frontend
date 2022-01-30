package com.example.githubapp.models

data class searchUserResponse(
    val incomplete_results: Boolean,
    val items: MutableList<Item>?,
    val total_count: Int
)