package com.example.githistoryapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import exampleUser
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import user

class SearchUserActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        var userslist= arrayListOf<exampleUser>(exampleUser("user search"))
        val BaseUrl="https://api.github.com/search/"
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search_user)
        val useridButton:Button=findViewById(R.id.useridenterbutton)
        val useridEditText:EditText=findViewById(R.id.userid)
        val userRecycler:RecyclerView=findViewById(R.id.usersRecyclerview)

        useridButton.setOnClickListener {
            userslist.clear()
            //userslist.add(exampleUser("user search"))

            val userid:String=useridEditText.text.toString()

            val retrofitBuilder =Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BaseUrl)
                .build()
                .create(apiInterface::class.java)
            val url=BaseUrl+"users?q="+userid+"&page=1"
            val retrofitdata=retrofitBuilder.getUser(url)
            retrofitdata.enqueue(object : Callback<user?> {
                override fun onResponse(call: Call<user?>, response: Response<user?>) {
                    val responsebody=response.body()!!
                    var i:Int=0
                    if(responsebody.items.size==0){
                        Toast.makeText(this@SearchUserActivity,"enter valid username",Toast.LENGTH_SHORT).show()
                    }
                    else {
                        for (username in responsebody.items) {
                            if (i == 20) {

                                break
                            }

                            userslist.add(exampleUser(username.login))
                            i = i + 1
                        }
                        //intent.putExtra("users list",userslist)
                        //startActivity(intent)
                        var adapter=userAdapter(userslist)
                        userRecycler.adapter = adapter
                        userRecycler.layoutManager = LinearLayoutManager(this@SearchUserActivity)
                        userRecycler.setHasFixedSize(true)
                        adapter.setOnItemClickListener(object :userAdapter.onItemClickListener{
                            override fun onItemClick(position: Int) {
                                val intent=Intent(this@SearchUserActivity,ReposActivity::class.java)
                                intent.putExtra("userid",userslist[position].username)
                                startActivity(intent)
                            }
                        })
                    }
                }

                override fun onFailure(call: Call<user?>, t: Throwable) {
                    println("amith"+t.message)
                }
            })

        }
    }
}