package com.adityaoo7.githistory.models

import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

/**
 * User data model with information of person on github profile.
 * @param name name of person
 * @param userName user name of person on github profile
 * @param avatarUrl url link to avatar on github profile
 * @param bio litter information provided by person
 */
@Parcelize
data class User(
    val name: String,
    @Json(name = "login") val userName: String,
    @Json(name = "avatar_url") val avatarUrl: String,
    val bio: String
) : Parcelable