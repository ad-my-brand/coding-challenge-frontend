package com.adityaoo7.githistory

import android.app.Application
import android.content.Context
import androidx.test.runner.AndroidJUnitRunner

/**
 * Test runner customized to use [TestApplication], extends [AndroidJUnitRunner]
 */
class CustomTestRunner : AndroidJUnitRunner() {
    override fun newApplication(
        cl: ClassLoader?,
        className: String?,
        context: Context?
    ): Application {
        return super.newApplication(cl, TestApplication::class.java.name, context)
    }
}