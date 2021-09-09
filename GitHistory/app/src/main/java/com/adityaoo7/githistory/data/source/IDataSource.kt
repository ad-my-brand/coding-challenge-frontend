package com.adityaoo7.githistory.data.source

import com.adityaoo7.githistory.models.Comment
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.models.User
import com.adityaoo7.githistory.utils.Result

/**
 * An interface for data sources like remote and local.
 * All methods from this interface returns [Result]
 */
interface IDataSource {
    /**
     * Returns [Result] with data as [User] (which is from provided user name) on [Result.Success].
     * If any error occurred, it returns [Result.Error] with exception
     *
     * @param userName user name of person on github
     * @return [User] model (wrapped in [Result]) with information based person's profile on github
     * @see User
     */
    suspend fun getUser(userName: String): Result<User>

    /**
     * Returns [Result] with data as [Repository] (based on provided information) on [Result.Success].
     * If any error occurred, it returns [Result.Error] with exception
     *
     * @param userName user name of person on github
     * @param repoName name of repository whose information you want
     * @return [Repository] model (wrapped in [Result]) with information about repository
     * @see Repository
     */
    suspend fun getRepository(userName: String, repoName: String): Result<Repository>

    /**
     * Returns [Result] with data as list of [Repository] (based on provided information) on [Result.Success].
     * If any error occurred, it returns [Result.Error] with exception
     *
     * @param userName user name of person on github
     * @return list of [Repository] model (wrapped in [Result])
     * @see Repository
     */
    suspend fun getRepositories(userName: String): Result<List<Repository>>

    /**
     * Returns [Result] with data as [Issue] (based on provided information) on [Result.Success].
     * If any error occurred, it returns [Result.Error] with exception
     *
     * @param userName user name of person on github
     * @param repoName name of repository
     * @param issueNumber number which was assigned to issue
     * @return [Issue] model (wrapped in [Result]) with information about issue
     * @see Issue
     */
    suspend fun getIssue(userName: String, repoName: String, issueNumber: Int): Result<Issue>

    /**
     * Returns [Result] with data as list of [Issue] (based on provided information) on [Result.Success].
     * If any error occurred, it returns [Result.Error] with exception
     *
     * @param userName user name of person on github
     * @param repoName name of repository
     * @return list of [Issue] model (wrapped in [Result]) with information about issue
     * @see Issue
     */
    suspend fun getIssues(userName: String, repoName: String): Result<List<Issue>>

    /**
     * Returns [Result] with data as list of [Comment] (based on provided information) on [Result.Success].
     * If any error occurred, it returns [Result.Error] with exception
     *
     * @param userName user name of person on github
     * @param repoName name of repository
     * @param issueNumber number which was assigned to issue
     * @return list of [Comment] model (wrapped in [Result]) with information about issue
     * @see Comment
     */
    suspend fun getComments(
        userName: String,
        repoName: String,
        issueNumber: Int
    ): Result<List<Comment>>
}