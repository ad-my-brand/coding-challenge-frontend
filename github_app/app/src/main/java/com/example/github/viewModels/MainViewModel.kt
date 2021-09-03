package com.example.github.viewModels

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.github.models.User
import com.example.github.repositories.MainActivityRepository
import kotlinx.coroutines.launch
import retrofit2.Response
import java.lang.ref.WeakReference

class MainViewModel(private val repository: MainActivityRepository): ViewModel() {
    var user: MutableLiveData<Response<User>> = MutableLiveData()

    @RequiresApi(Build.VERSION_CODES.M)
    fun getUser(userName: String) {
        viewModelScope.launch {
                val response: Response<User> = repository.getUser(userName)
                user.value = response
        }
    }

}