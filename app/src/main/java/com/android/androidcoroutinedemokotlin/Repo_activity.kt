package com.android.androidcoroutinedemokotlin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class Repo_activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_repo)

        val repo_url:String=intent.getStringExtra("Repo_URL").toString()

    }
}