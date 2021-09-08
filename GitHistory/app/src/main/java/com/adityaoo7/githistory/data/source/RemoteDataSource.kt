package com.adityaoo7.githistory.data.source

import com.adityaoo7.githistory.models.Comment
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.models.User
import com.adityaoo7.githistory.network.GithubApiService
import com.adityaoo7.githistory.utils.*
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class RemoteDataSource @Inject constructor(
    private val apiService: GithubApiService,
    private val ioDispatcher: CoroutineDispatcher
) : IDataSource {
    override suspend fun getUser(userName: String): Result<User> = withContext(ioDispatcher) {
        try {
            val user = apiService.getUser(userName)
            return@withContext if (user != null) {
                Result.Success(user)
            } else {
                Result.Error(Exception(USER_NOT_FOUND_ERROR))
            }
        } catch (e: Exception) {
            return@withContext Result.Error(e)
        }
    }

    override suspend fun getRepository(userName: String, repoName: String): Result<Repository> =
        withContext(ioDispatcher) {
            try {
                val repository = apiService.getRepository(userName, repoName)
                return@withContext if (repository != null) {
                    Result.Success(repository)
                } else {
                    Result.Error(Exception(REPOSITORY_NOT_FOUND_ERROR))
                }
            } catch (e: Exception) {
                return@withContext Result.Error(e)
            }
        }

    override suspend fun getRepositories(userName: String): Result<List<Repository>> =
        withContext(ioDispatcher) {
            try {
                val repositories = apiService.getRepositories(userName)
                return@withContext if (repositories != null) {
                    Result.Success(repositories)
                } else {
                    Result.Error(Exception(FETCHING_REPOSITORIES_ERROR))
                }
            } catch (e: Exception) {
                return@withContext Result.Error(e)
            }
        }

    override suspend fun getIssue(
        userName: String,
        repoName: String,
        issueNumber: Int
    ): Result<Issue> = withContext(ioDispatcher) {
        try {
            val issue = apiService.getIssue(userName, repoName, issueNumber)
            return@withContext if (issue != null) {
                Result.Success(issue)
            } else {
                Result.Error(Exception(ISSUE_NOT_FOUND_ERROR))
            }
        } catch (e: Exception) {
            return@withContext Result.Error(e)
        }
    }

    override suspend fun getIssues(userName: String, repoName: String): Result<List<Issue>> =
        withContext(ioDispatcher) {
            try {
                val issues = apiService.getIssues(userName, repoName)
                return@withContext if (issues != null) {
                    Result.Success(issues)
                } else {
                    Result.Error(Exception(FETCHING_ISSUES_ERROR))
                }
            } catch (e: Exception) {
                return@withContext Result.Error(e)
            }
        }

    override suspend fun getComments(
        userName: String,
        repoName: String,
        issueNumber: Int
    ): Result<List<Comment>> = withContext(ioDispatcher) {
        try {
            val comments = apiService.getComments(userName, repoName, issueNumber)
            return@withContext if (comments != null) {
                Result.Success(comments)
            } else {
                Result.Error(Exception(FETCHING_COMMENTS_ERROR))
            }
        } catch (e: Exception) {
            return@withContext Result.Error(e)
        }
    }
}