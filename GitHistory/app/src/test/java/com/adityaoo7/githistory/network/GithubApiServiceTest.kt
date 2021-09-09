package com.adityaoo7.githistory.network

import com.adityaoo7.githistory.models.*
import com.adityaoo7.githistory.utils.enqueueResponse
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.runBlocking
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockWebServer
import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.`is`
import org.junit.After
import org.junit.Test
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import java.util.concurrent.TimeUnit

@ExperimentalCoroutinesApi
class GithubApiServiceTest {

    private val mockWebServer = MockWebServer()

    private val client = OkHttpClient.Builder()
        .connectTimeout(1, TimeUnit.SECONDS)
        .readTimeout(1, TimeUnit.SECONDS)
        .writeTimeout(1, TimeUnit.SECONDS)
        .build()

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val api = Retrofit.Builder()
        .baseUrl(mockWebServer.url("/"))
        .client(client)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()
        .create(GithubApiService::class.java)

    private val user = "defunkt"
    private val repo = "cache_fu"
    private val number = 5

    @After
    fun tearDown() {
        mockWebServer.shutdown()
    }

    @Test
    fun givenUserName_whenGetUserCalled_thenUserReturned() = runBlocking {
        // Given :
        mockWebServer.enqueueResponse("user.json", 200)

        // When :
        val result = api.getUser(user)

        val expected = User(
            name = "Chris Wanstrath",
            userName = "defunkt",
            avatarUrl = "https://avatars.githubusercontent.com/u/2?v=4",
            bio = "\uD83C\uDF54"
        )

        // Then :
        val recordedRequest = mockWebServer.takeRequest()
        assertThat(recordedRequest.method, `is`("GET"))
        assertThat(recordedRequest.path, `is`("/users/$user"))
        assertThat(mockWebServer.requestCount, `is`(1))
        assertThat(result, `is`(expected))
    }

    @Test
    fun givenUserNameAndRepositoryName_whenGetRepositoryCalled_thenRepositoryReturned() =
        runBlocking {
            // Given :
            mockWebServer.enqueueResponse("repo.json", 200)

            // When :
            val result = api.getRepository(user, repo)

            val expected = Repository(
                name = "cache_fu",
                description = "Ghost from Christmas past. Unmaintained.",
                stars = 253,
                forks = 74
            )

            // Then :
            val recordedRequest = mockWebServer.takeRequest()
            assertThat(recordedRequest.method, `is`("GET"))
            assertThat(recordedRequest.path, `is`("/repos/$user/$repo"))
            assertThat(mockWebServer.requestCount, `is`(1))
            assertThat(result, `is`(expected))
        }

    @Test
    fun givenUserName_whenGetRepositoriesCalled_thenListOfRepositoriesReturned() = runBlocking {
        // Given :
        mockWebServer.enqueueResponse("repos.json", 200)

        // When :
        val result = api.getRepositories(user)

        val expected = listOf(
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

        // Then :
        val recordedRequest = mockWebServer.takeRequest()
        assertThat(recordedRequest.method, `is`("GET"))
        assertThat(recordedRequest.path, `is`("/users/$user/repos"))
        assertThat(mockWebServer.requestCount, `is`(1))
        assertThat(result, `is`(expected))
    }

    @Test
    fun givenUserNameRepositoryNameIssueNumber_whenGetIssueCalled_thenIssueReturned() =
        runBlocking {
            // Given :
            mockWebServer.enqueueResponse("issue.json", 200)

            // When :
            val result = api.getIssue(user, repo, number)
            val expected = Issue(
                number = 5,
                title = "cache_fu's config is conflict to config in rails3",
                body = "when i do:\n" +
                        "rake db:migrate  RAILS_ENV=development",
                date = "2010-09-22T20:45:25Z",
                author = Author(userName = "IceskYsl")
            )

            // Then :
            val recordedRequest = mockWebServer.takeRequest()
            assertThat(recordedRequest.method, `is`("GET"))
            assertThat(recordedRequest.path, `is`("/repos/$user/$repo/issues/$number"))
            assertThat(mockWebServer.requestCount, `is`(1))
            assertThat(result, `is`(expected))
        }

    @Test
    fun givenUserNameRepositoryName_whenGetIssuesCalled_thenListOfIssuesReturned() = runBlocking {
        // Given :
        mockWebServer.enqueueResponse("issues.json", 200)

        // When :
        val result = api.getIssues(user, repo)

        val expected = listOf(
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

        // Then :
        val recordedRequest = mockWebServer.takeRequest()
        assertThat(recordedRequest.method, `is`("GET"))
        assertThat(recordedRequest.path, `is`("/repos/$user/$repo/issues"))
        assertThat(mockWebServer.requestCount, `is`(1))
        assertThat(result, `is`(expected))
    }

    @Test
    fun givenUserNameRepositoryNameIssueNumber_whenGetCommentsCalled_thenListOfCommentsReturned() =
        runBlocking {
            // Given :
            mockWebServer.enqueueResponse("comments.json", 200)

            // When :
            val result = api.getComments(user, repo, number)

            val expected = listOf(
                Comment(
                    body = "It looks like this error is being caused by the \"config\" method in tasks",
                    date = "2010-09-22T20:45:25Z",
                    author = Author(userName = "ahwatts")
                )
            )

            // Then :
            val recordedRequest = mockWebServer.takeRequest()
            assertThat(recordedRequest.method, `is`("GET"))
            assertThat(recordedRequest.path, `is`("/repos/$user/$repo/issues/$number/comments"))
            assertThat(mockWebServer.requestCount, `is`(1))
            assertThat(result, `is`(expected))
        }
}