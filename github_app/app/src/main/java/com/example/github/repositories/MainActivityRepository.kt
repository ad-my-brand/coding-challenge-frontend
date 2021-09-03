package com.example.github.repositories

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModelProvider
import com.example.github.api.RetrofitInstance
import com.example.github.models.User
import com.example.github.viewModels.MainViewModel
import retrofit2.Response

class MainActivityRepository {
    private val retrofitInstance = RetrofitInstance

    suspend fun getUser(args: String): Response<User> {
        return retrofitInstance.api.getUser(args)
    }
}