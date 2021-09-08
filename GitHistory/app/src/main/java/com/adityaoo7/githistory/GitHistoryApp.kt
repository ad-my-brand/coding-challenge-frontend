package com.adityaoo7.githistory

import android.app.Application
import com.adityaoo7.githistory.data.source.IDataSource

class GitHistoryApp : Application() {

    val dataSource: IDataSource = ServiceLocator.provideDataSource()
}