package com.adityaoo7.githistory.models

import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

/**
 * Comment data model, consists of body of comment and when it was posted
 * @param author user who wrote this comment
 * @param body body/text of comment
 * @param date date when this comment was made
 */
@Parcelize
data class Comment(
    @Json(name = "user") val author: Author,
    val body: String,
    @Json(name = "updated_at") val date: String
) : Parcelable
