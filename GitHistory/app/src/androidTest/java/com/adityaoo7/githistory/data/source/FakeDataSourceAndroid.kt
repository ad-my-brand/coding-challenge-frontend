package com.adityaoo7.githistory.data.source

import com.adityaoo7.githistory.models.*
import com.adityaoo7.githistory.utils.*
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class FakeDataSourceAndroid @Inject constructor() : IDataSource {
    val user = User(
        name = "Test User",
        userName = "tasty",
        avatarUrl = "https://avatars.githubusercontent.com/",
        bio = "Another Developer"
    )

    val repositories = listOf(
        Repository(
            name = "ace",
            description = "Ajax.org Cloud9 Editor",
            stars = 16,
            forks = 6
        ),
        Repository(
            name = "acts_as_textiled",
            description = "Makes your models act as textiled.",
            stars = 114,
            forks = 34
        ),
        Repository(
            name = "ambition",
            description = "include Enumerable — Unmaintained",
            stars = 157,
            forks = 22
        )
    )

    val issues = listOf(
        Issue(
            number = 2,
            title = "avoid overriding the \"cache_key\" method for ActiveRecord::Base children",
            body = "recent rails versions come with a nice cache_key method that concatenates",
            date = "2009-10-02T09:13:25Z",
            author = Author(userName = "ktlacaelel")
        ),
        Issue(
            number = 1,
            title = "Action caching broken",
            body = "I spent a couple hours banging my head against " +
                    "the wall trying to figure out why our action caching wasn't working",
            date = "2010-10-19T04:57:03Z",
            author = Author(userName = "bgreenlee")
        )
    )

    val comments = listOf(
        Comment(
            body = "It looks like this error is being caused by the \"config\" method in tasks",
            date = "2010-09-22T20:45:25Z",
            author = Author(userName = "ahwatts")
        ),
        Comment(
            body = "Error is being caused by method in tasks",
            date = "2018-20-22T20:25:03Z",
            author = Author(userName = "JustAnotherUser")
        )
    )

    private var shouldReturnError = false
    fun setShouldReturnError(value: Boolean) {
        shouldReturnError = value
    }

    private var shouldReturnEmpty = false
    fun setShouldReturnEmpty(value: Boolean) {
        shouldReturnEmpty = value
    }

    override suspend fun getUser(userName: String): Result<User> {
        return when {
            shouldReturnError -> {
                Result.Error(Exception("Test Exception"))
            }
            else -> {
                Result.Success(user)
            }
        }
    }

    override suspend fun getRepository(userName: String, repoName: String): Result<Repository> {
        return when {
            shouldReturnError -> {
                Result.Error(Exception("Test Exception"))
            }
            else -> {
                Result.Success(repositories[0])
            }
        }
    }

    override suspend fun getRepositories(userName: String): Result<List<Repository>> {
        return when {
            shouldReturnError -> {
                Result.Error(Exception("Test Exception"))
            }
            shouldReturnEmpty -> {
                Result.Success(emptyList())
            }
            else -> {
                Result.Success(repositories)
            }
        }
    }

    override suspend fun getIssue(
        userName: String,
        repoName: String,
        issueNumber: Int
    ): Result<Issue> {
        return when {
            shouldReturnError -> {
                Result.Error(Exception("Test Exception"))
            }
            else -> {
                Result.Success(issues[0])
            }
        }
    }

    override suspend fun getIssues(userName: String, repoName: String): Result<List<Issue>> {
        return when {
            shouldReturnError -> {
                Result.Error(Exception("Test Exception"))
            }
            shouldReturnEmpty -> {
                Result.Success(emptyList())
            }
            else -> {
                Result.Success(issues)
            }
        }
    }

    override suspend fun getComments(
        userName: String,
        repoName: String,
        issueNumber: Int
    ): Result<List<Comment>> {
        return when {
            shouldReturnError -> {
                Result.Error(Exception("Test Exception"))
            }
            shouldReturnEmpty -> {
                Result.Success(emptyList())
            }
            else -> {
                Result.Success(comments)
            }
        }
    }
}