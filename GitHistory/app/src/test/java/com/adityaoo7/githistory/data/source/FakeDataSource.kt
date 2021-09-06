package com.adityaoo7.githistory.data.source

import com.adityaoo7.githistory.models.Comment
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.models.User
import com.adityaoo7.githistory.utils.Result

class FakeDataSource : IDataSource {
    val user = User(
        name = "Test User",
        userName = "tasty",
        avatarUrl = "https://avatars.githubusercontent.com/",
        bio = "Another Developer",
        following = 210,
        followers = 212
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
            url = "https://github.com/defunkt/cache_fu/issues/2"
        ),
        Issue(
            number = 1,
            title = "Action caching broken",
            body = "I spent a couple hours banging my head against " +
                    "the wall trying to figure out why our action caching wasn't working",
            url = "https://github.com/defunkt/cache_fu/issues/1"
        )
    )

    val comments = listOf(
        Comment(
            body = "It looks like this error is being caused by the \"config\" method in tasks",
            date = "2010-09-22T20:45:25Z"
        ),
        Comment(
            body = "Error is being caused by method in tasks",
            date = "2018-20-22T20:25:03Z"
        )
    )

    private var shouldReturnError = false
    fun setShouldReturnError(value: Boolean) {
        shouldReturnError = value
    }

    override suspend fun getUser(userName: String): Result<User> {
        return if (shouldReturnError) {
            Result.Error(Exception("Test Exception"))
        } else {
            Result.Success(user)
        }
    }

    override suspend fun getRepository(userName: String, repoName: String): Result<Repository> {
        return if (shouldReturnError) {
            Result.Error(Exception("Test Exception"))
        } else {
            Result.Success(repositories[0])
        }
    }

    override suspend fun getRepositories(userName: String): Result<List<Repository>> {
        return if (shouldReturnError) {
            Result.Error(Exception("Test Exception"))
        } else {
            Result.Success(repositories)
        }
    }

    override suspend fun getIssue(
        userName: String,
        repoName: String,
        issueNumber: Int
    ): Result<Issue> {
        return if (shouldReturnError) {
            Result.Error(Exception("Test Exception"))
        } else {
            Result.Success(issues[0])
        }
    }

    override suspend fun getIssues(userName: String, repoName: String): Result<List<Issue>> {
        return if (shouldReturnError) {
            Result.Error(Exception("Test Exception"))
        } else {
            Result.Success(issues)
        }
    }

    override suspend fun getComments(
        userName: String,
        repoName: String,
        issueNumber: Int
    ): Result<List<Comment>> {
        return if (shouldReturnError) {
            Result.Error(Exception("Test Exception"))
        } else {
            Result.Success(comments)
        }
    }
}