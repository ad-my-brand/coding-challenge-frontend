package com.adityaoo7.githistory

import android.app.Application
import com.adityaoo7.githistory.di.AppComponent
import com.adityaoo7.githistory.di.DaggerAppComponent

open class GitHistoryApp : Application() {

    val appComponent: AppComponent by lazy {
        initializeComponent()
    }

    open fun initializeComponent(): AppComponent {
        return DaggerAppComponent.factory().create()
    }
}