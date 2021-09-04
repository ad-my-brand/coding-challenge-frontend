package com.sid.github.activity

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.sid.github.R
import com.sid.github.adapter.RepoRecyclerAdapter
import com.sid.github.api.Base
import com.sid.github.api.Routes
import com.sid.github.model.Repo
import com.sid.github.model.User
import com.squareup.picasso.Picasso
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList
import kotlin.properties.Delegates


class ProfileActivity : AppCompatActivity() {

    lateinit var userImg : ImageView
    lateinit var userName : TextView
    lateinit var userJoinDate : TextView
    lateinit var userRepos : TextView
    lateinit var userFollowers : TextView
    lateinit var userFollowing : TextView

    lateinit var profileRV : RecyclerView
    lateinit var recyclerAdapter : RepoRecyclerAdapter

    lateinit var progressLayout : RelativeLayout
    lateinit var userNotFound : RelativeLayout
    lateinit var scrollView : ScrollView

    private val repoList : ArrayList<Repo> = arrayListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        userImg = findViewById(R.id.userImg)
        userName = findViewById(R.id.userName)
        userJoinDate = findViewById(R.id.userJoinDate)
        userRepos = findViewById(R.id.userRepos)
        userFollowers = findViewById(R.id.userFollowers)
        userFollowing = findViewById(R.id.userFollowing)

        profileRV = findViewById(R.id.repoRV)

        progressLayout = findViewById(R.id.progressLayout)
        userNotFound = findViewById(R.id.userNotFound)
        scrollView = findViewById(R.id.sv1)

        recyclerAdapter = RepoRecyclerAdapter(this, repoList)
        profileRV.adapter = recyclerAdapter
        profileRV.layoutManager = LinearLayoutManager(this)
        profileRV.isNestedScrollingEnabled=false

        val uName = intent.getStringExtra("USERNAME").toString()

        getUserData(uName)

        getReposData(uName)

    }

    private fun getUserData(name: String) {
        val api = Base().getClient()?.create(Routes::class.java) ?: return
        val user = api.getUserDetails(name)
        user.enqueue(object : Callback<User> {
            @SuppressLint("SetTextI18n")
            override fun onResponse(call: Call<User>, response: Response<User>) {
                progressLayout.visibility = View.GONE
                try {
                    val res = response.body()
                    Picasso.get().load(res?.getAvatar()).error(R.drawable.github_logo).into(userImg)
                    if (res != null) {
                        userName.text = res.getName()
                        userJoinDate.text = "Joined " + convertDateFormat(res.getJoined())
                        userRepos.text = res.getRepos()
                        userFollowers.text = res.getFollowers()
                        userFollowing.text = res.getFollowing()
                    }else{
                        progressLayout.visibility = View.GONE
                        scrollView.visibility = View.GONE
                        userNotFound.visibility = View.VISIBLE
                        Toast.makeText(this@ProfileActivity, "User not found!", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@ProfileActivity, "Error Occurred!!!", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {
                Toast.makeText(this@ProfileActivity, "$t", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun getReposData(name: String){
        val api = Base().getClient()?.create(Routes::class.java) ?: return
        val repos = api.getRepoDetails(name)
        repos.enqueue(object : Callback<List<Repo>> {
            override fun onResponse(call: Call<List<Repo>>, response: Response<List<Repo>>) {
                repoList.clear()
                val res = response.body()
                if (res != null) {
                    for (i in res.indices) {
                        val it = res[i]
                        repoList.add(it)
                    }
                }
                recyclerAdapter.notifyDataSetChanged()
            }

            override fun onFailure(call: Call<List<Repo>>, t: Throwable) {
                Toast.makeText(this@ProfileActivity, "$t", Toast.LENGTH_SHORT).show()
            }
        })
    }

    @SuppressLint("SimpleDateFormat")
    private fun convertDateFormat(input: String?) : String{
        val parser =  SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
        val formatter = SimpleDateFormat("MMMM dd, yyyy")
        return formatter.format(parser.parse(input))
    }

}