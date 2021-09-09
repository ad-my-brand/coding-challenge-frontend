package com.adityaoo7.githistory.models

import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

/**
 * Issue data model with information about issue in particular repository.
 * @param number number assigned to issue when it was created
 * @param author user who created this issue
 * @param title head text for issue
 * @param body body text for issue
 * @param date url link to issue on github
 */
@Parcelize
data class Issue(
    val number: Int,
    @Json(name = "user") val author: Author,
    val title: String,
    val body: String,
    @Json(name = "updated_at") val date: String
) : Parcelable
