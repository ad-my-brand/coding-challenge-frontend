package com.adityaoo7.githistory.utils

/**
 * A generic class that holds a value with its loading status.
 * @param <T>
 */
sealed class Result<out R> {
    /**
     * Should return this if result you wanted was success.
     * @param data result obtained on success
     */
    data class Success<out T>(val data: T) : Result<T>()

    /**
     * Should return this if you didn't get the result you wanted or faced some error
     * @param exception exception that will be thrown when an error occurred
     */
    data class Error(val exception: Exception) : Result<Nothing>()

    /**
     * Just a state of loading result
     */
    object Loading : Result<Nothing>()

    override fun toString(): String {
        return when (this) {
            is Success<*> -> "Success[data=$data]"
            is Error -> "Error[exception=$exception]"
            Loading -> "Loading"
        }
    }
}

/**
 * `true` if [Result] is of type [Result.Success] & holds non-null [Result.Success.data].
 */
val Result<*>.succeeded
    get() = this is Result.Success && data != null