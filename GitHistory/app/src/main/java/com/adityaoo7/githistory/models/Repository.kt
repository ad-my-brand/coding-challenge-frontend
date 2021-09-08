package com.adityaoo7.githistory.models

import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

/**
 * Repository data model with information about repository published on github
 * @param name name of repository
 * @param description some extra information
 * @param stars number of people stargazed this repository
 * @param forks number of forks made
 */
@Parcelize
data class Repository(
    val name: String,
    val description: String?,
    @Json(name = "stargazers_count") val stars: Int,
    val forks: Int
) : Parcelable