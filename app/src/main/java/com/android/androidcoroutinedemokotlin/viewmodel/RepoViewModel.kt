package com.android.androidcoroutinedemokotlin.viewmodel

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.androidcoroutinedemokotlin.models.RecyclerData
import com.android.androidcoroutinedemokotlin.network.RetroInstance
import com.android.androidcoroutinedemokotlin.network.RetroService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.internal.Internal.instance
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit

class RepoViewModel : ViewModel() {
    val listFollowrs = MutableLiveData<ArrayList<RecyclerData>>()
    fun setListRepo(username: String) {
        viewModelScope.launch(Dispatchers.IO) {
            val retroInstance = RetroInstance.getRetroInstance().create(RetroService::class.java)
            val response = retroInstance.getUserRepo(username)
                .enqueue(object : Callback<ArrayList<RecyclerData>> {
                    override fun onResponse(
                        call: Call<ArrayList<RecyclerData>>,
                        response: Response<ArrayList<RecyclerData>>
                    ) {
                        if (response.isSuccessful) {
                            listFollowrs.postValue(response.body())
                        }
                    }

                    override fun onFailure(call: Call<ArrayList<RecyclerData>>, t: Throwable) {
                        t.message?.let { Log.d("onFailure", it) }
                    }

                })
        }
    }

    fun getListRepo(): LiveData<ArrayList<RecyclerData>> {
        return listFollowrs
    }

}