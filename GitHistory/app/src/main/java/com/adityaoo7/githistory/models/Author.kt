package com.adityaoo7.githistory.models

import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class Author(
    @Json(name = "login") val userName: String
) : Parcelable
