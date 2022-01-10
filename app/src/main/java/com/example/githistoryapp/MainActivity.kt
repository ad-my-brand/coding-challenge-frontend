package com.example.githistoryapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatDelegate

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val go:Button=findViewById(R.id.startButton)
        go.setOnClickListener {
            val intent=Intent(this,SearchUserActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}