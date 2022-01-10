package com.example.githistoryapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.EditText
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.*
import retrofit2.converter.gson.GsonConverterFactory

class ReposActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_repos)
        var reposlist= arrayListOf<repoExample>()
        val intent=intent
        val userid=intent.getStringExtra("userid")
        val textView:TextView=findViewById(R.id.reponame)
        //val username:TextView=findViewById(R.id.username)
        val BaseUrlRepos="https://api.github.com/users/"
        val retrofitBuilder=Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl(BaseUrlRepos)
            .build()
            .create(apiInterface::class.java)
        val url=BaseUrlRepos+userid+"/repos"
        val retrofitdata=retrofitBuilder.getrepo(url)
        retrofitdata.enqueue(object : Callback<List<repoItem>?> {
            override fun onResponse(
                call: Call<List<repoItem>?>,
                response: Response<List<repoItem>?>
            ) {
                val responsebody=response.body()
                if(responsebody!!.isEmpty()){
                    textView.text="No Repositories to display"
                }
                else {
                    textView.text="Repositories"
                    for (repo in responsebody!!) {
                        reposlist.add(repoExample(repo.name.toString()))
                    }
                    val recyclerView: RecyclerView = findViewById(R.id.reposRecyclerview)
                    val adapter=repoAdapter(reposlist)
                    recyclerView.adapter = adapter
                    recyclerView.layoutManager = LinearLayoutManager(this@ReposActivity)
                    recyclerView.setHasFixedSize(true)
                    adapter.setOnItemClickListener(object:repoAdapter.onItemClickListener{
                        override fun onItemClick(position: Int) {
                            val name:String=reposlist[position].reponame.toString()
                            val intent=Intent(this@ReposActivity,commitsActivity::class.java)
                            intent.putExtra("reponame",name)
                            intent.putExtra("userid",userid)
                            startActivity(intent)
                        }
                    })
                }

            }

            override fun onFailure(call: Call<List<repoItem>?>, t: Throwable) {
                print(t.message)
            }
        })

        //sername.setText(userid.toString())
    }
}