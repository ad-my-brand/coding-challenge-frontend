package com.adityaoo7.githistory

import com.adityaoo7.githistory.di.AppComponent
import com.adityaoo7.githistory.di.DaggerTestAppComponent

/**
 * Test application used during instrumented testing. It extends [GitHistoryApp]
 */
class TestApplication : GitHistoryApp() {

    override fun initializeComponent(): AppComponent {
        return DaggerTestAppComponent.create()
    }
}