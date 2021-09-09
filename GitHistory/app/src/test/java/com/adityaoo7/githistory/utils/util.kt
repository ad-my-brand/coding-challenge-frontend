package com.adityaoo7.githistory.utils

import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okio.buffer
import okio.source
import java.nio.charset.StandardCharsets

internal fun MockWebServer.enqueueResponse(file: String, responseCode: Int) {
    val inputStream = javaClass.classLoader?.getResourceAsStream("api-response/$file")
    val source = inputStream?.let { inputStream.source().buffer() }
    source?.let {
        enqueue(
            MockResponse()
                .setResponseCode(responseCode)
                .setBody(source.readString(StandardCharsets.UTF_8))
        )
    }
}