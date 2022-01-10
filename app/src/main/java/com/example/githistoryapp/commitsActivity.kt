package com.example.githistoryapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class commitsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        val baseurlcommit="https://api.github.com/repos/"
        var commitslist= arrayListOf<exampleCommit>()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_commits)
        val intent=intent
        val reponame:String?=intent.getStringExtra("reponame")
        val username:String?=intent.getStringExtra("userid")
        val textView:TextView=findViewById(R.id.committextview)
        val url:String=baseurlcommit+username.toString()+"/"+reponame.toString()+"/commits"
        println("akshayupadhya"+url)
        val retrofitBuilder = Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl(baseurlcommit)
            .build()
            .create(apiInterface::class.java)
        val retrofitdata=retrofitBuilder.getcommit(url)
        retrofitdata.enqueue(object : Callback<List<commitItem>?> {
            override fun onResponse(
                call: Call<List<commitItem>?>,
                response: Response<List<commitItem>?>
            ) {
                val responsebody = response.body()
                if (responsebody != null) {
                    textView.text="commits"
                    for (x in responsebody!!) {
                        val sha: String = x.sha.toString().subSequence(0, 7).toString()
                        val message: String = x.commit.message.toString()
                        commitslist.add(exampleCommit(sha, message))
                    }
                    val recyclerView: RecyclerView = findViewById(R.id.commitsrecyclerview)
                    recyclerView.adapter = commitAdapter(commitslist)
                    recyclerView.layoutManager = LinearLayoutManager(this@commitsActivity)
                    recyclerView.setHasFixedSize(true)
                }
                else{
                    textView.text="no commits"
                }
            }

            override fun onFailure(call: Call<List<commitItem>?>, t: Throwable) {
                print(t.message)
            }
        })
    }
}