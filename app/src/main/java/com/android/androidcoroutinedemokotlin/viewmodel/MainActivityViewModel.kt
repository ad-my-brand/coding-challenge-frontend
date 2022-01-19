package com.android.androidcoroutinedemokotlin.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.androidcoroutinedemokotlin.models.RecyclerData
import com.android.androidcoroutinedemokotlin.models.RecyclerList
import com.android.androidcoroutinedemokotlin.network.RetroInstance
import com.android.androidcoroutinedemokotlin.network.RetroService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivityViewModel: ViewModel() {
   var recyclerListLiveData = MutableLiveData<ArrayList<RecyclerData>>()

    init {
        recyclerListLiveData = MutableLiveData()
    }

    fun getRecyclerListObserver(): LiveData<ArrayList<RecyclerData>> {
        return recyclerListLiveData
    }

    fun makeApiCall(Query:String) {

        viewModelScope.launch(Dispatchers.IO) {
            val retroInstance = RetroInstance.getRetroInstance().create(RetroService::class.java)
            val response  = retroInstance.getDataFromApi(Query ).enqueue(object: Callback<RecyclerList>{
                override fun onResponse(
                    call: Call<RecyclerList>,
                    response: Response<RecyclerList>
                ) {
                    recyclerListLiveData.postValue(response.body()?.items)
                }

                override fun onFailure(call: Call<RecyclerList>, t: Throwable) {
                    TODO("Not yet implemented")
                }

            })

        }
    }
}