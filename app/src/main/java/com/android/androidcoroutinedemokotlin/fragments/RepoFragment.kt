package com.android.androidcoroutinedemokotlin.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.androidcoroutinedemokotlin.R
import com.android.androidcoroutinedemokotlin.adapter.RecyclerViewAdapter
import com.android.androidcoroutinedemokotlin.adapter.RepoAdapter
import com.android.androidcoroutinedemokotlin.databinding.FragmentRecyclerListBinding
import com.android.androidcoroutinedemokotlin.databinding.FragmentRepoBinding
import com.android.androidcoroutinedemokotlin.viewmodel.MainActivityViewModel
import com.android.androidcoroutinedemokotlin.viewmodel.RepoViewModel

class RepoFragment : Fragment(R.layout.fragment_repo) {
    private lateinit var viewModel: RepoViewModel
    private lateinit var recyclerAdapter : RepoAdapter
    private lateinit var binding: FragmentRepoBinding
    private lateinit var myuser:String
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding =  DataBindingUtil.inflate(inflater,
            R.layout.fragment_repo, container, false)
        viewModel= ViewModelProvider(this, ViewModelProvider.NewInstanceFactory()).get(RepoViewModel::class.java)

        val bundle = this.arguments
        if (bundle != null) {
            myuser = bundle.getString("UserName").toString()
          //  Toast.makeText(activity,myuser , Toast.LENGTH_SHORT).show()
        }
        initViewModel1()
        initViewModel()
        activity?.onBackPressedDispatcher?.addCallback(requireActivity(), object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
               view?.findNavController()?.navigate(R.id.action_repoFragment_to_recyclerListFragment)
            }
        })



        recyclerAdapter.setonItemClickListner(object:RepoAdapter.onItemClickListner{
            override fun onItemClicked(position: Int) {
//               val url = "https://github.com/"+ recyclerAdapter.items[position].name +"?tab=repositories"
//               val i = Intent(Intent.ACTION_VIEW)
//               i.data = Uri.parse(url)
//               startActivity(i)
                val bundel1=Bundle().apply {
                    putSerializable("User",myuser)
                    putSerializable("RepoName",recyclerAdapter.items[position].name)
                }
                view?.findNavController()?.navigate(R.id.action_repoFragment_to_issuesFragment,bundel1)

            }

        })

        return binding.root





    }
    private fun initViewModel1() {
        binding.apply {
            recyclerView1.layoutManager = LinearLayoutManager(activity)
            val decortion  = DividerItemDecoration(activity, DividerItemDecoration.VERTICAL)
            recyclerView1.addItemDecoration(decortion)

            recyclerAdapter = RepoAdapter()
            recyclerView1.adapter = recyclerAdapter
        }
    }
    private fun initViewModel() {
        PG(true)
        viewModel.setListRepo(myuser)

        viewModel.getListRepo().observe(requireActivity(), {
            if(it != null) {
                PG(false)
                recyclerAdapter.setUpdatedData(it)
                if(it.size==0){
                    view?.findNavController()?.navigate(R.id.action_issuesFragment_to_notAvailableFragment)
                }
            } else {
                Toast.makeText(activity, "Error in getting data", Toast.LENGTH_SHORT).show()
            }
        })

    }
    private  fun PG(state:Boolean){
        if(state){
            binding.progressBar.visibility=View.VISIBLE
        }else{
            binding.progressBar.visibility=View.GONE
        }
    }
  }

