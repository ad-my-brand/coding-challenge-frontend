package com.sid.github.activity

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import com.sid.github.R

class MainActivity : AppCompatActivity() {

    lateinit var username : TextInputEditText
    lateinit var search : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        username = findViewById(R.id.textInput)
        search = findViewById(R.id.btnSearch)

        search.setOnClickListener {
            if(username.text?.isEmpty() == true){
                username.error = "Mandatory"
                username.requestFocus()
                return@setOnClickListener
            }
            val intent = Intent(this, ProfileActivity::class.java)
            intent.putExtra("USERNAME",username.text.toString())
            username.text?.clear()
            startActivity(intent)
        }

    }
}