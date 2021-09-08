package com.adityaoo7.githistory.utils

import android.util.Log
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*

const val USER_NOT_FOUND_ERROR = "User not found"
const val REPOSITORY_NOT_FOUND_ERROR = "Repository not found"
const val FETCHING_REPOSITORIES_ERROR = "Unable to fetch repositories"
const val ISSUE_NOT_FOUND_ERROR = "Given issue number not found"
const val FETCHING_ISSUES_ERROR = "Unable to fetch issues"
const val FETCHING_COMMENTS_ERROR = "Unable to fetch comments"

/**
 * An extension function to convert standard date string i.e. [ "yyyy-MM-dd'T'HH:mm:ss'Z'" ] format
 * to simplified date string i.e.[ "hh:mm aaa dd MMM, yyyy" ] format.
 * @return simplified date string
 * @see SimpleDateFormat
 * @see Date
 */
fun String.convertToSimpleDateAndTime(): String {
    var simplifiedDate = ""
    try {
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US)
        val date = dateFormat.parse(this)
        val newFormat = SimpleDateFormat("hh:mm aaa dd MMM, yyyy", Locale.US)
        simplifiedDate = newFormat.format(date ?: Date())
    } catch (e: ParseException) {
        Log.d("String", "convertToDate: ${e.message}")
    }

    return simplifiedDate
}