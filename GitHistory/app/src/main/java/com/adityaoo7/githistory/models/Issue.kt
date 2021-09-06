package com.adityaoo7.githistory.models

import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

/**
 * Issue data model with information about issue in particular repository.
 * @param number number assigned to issue when it was created
 * @param title head text for issue
 * @param body body text for issue
 * @param url url link to issue on github
 */
@Parcelize
data class Issue(
    val number: Int,
    val title: String,
    val body: String,
    @Json(name = "html_url") val url: String
) : Parcelable
