package com.android.androidcoroutinedemokotlin.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.androidcoroutinedemokotlin.R
import com.android.androidcoroutinedemokotlin.adapter.IssueAdapter
import com.android.androidcoroutinedemokotlin.adapter.RepoAdapter
import com.android.androidcoroutinedemokotlin.databinding.FragmentIssuesBinding
import com.android.androidcoroutinedemokotlin.databinding.FragmentRepoBinding
import com.android.androidcoroutinedemokotlin.viewmodel.IssueViewModel
import com.android.androidcoroutinedemokotlin.viewmodel.RepoViewModel


class IssuesFragment : Fragment(R.layout.fragment_issues) {

    private lateinit var viewModel: IssueViewModel
    private lateinit var recyclerAdapter : IssueAdapter
    private lateinit var binding: FragmentIssuesBinding
    private lateinit var myuser:String
    private lateinit var reponame:String
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding =  DataBindingUtil.inflate(inflater,
            R.layout.fragment_issues, container, false)
        viewModel= ViewModelProvider(this, ViewModelProvider.NewInstanceFactory()).get(IssueViewModel::class.java)
        val bundle = this.arguments
        if (bundle != null) {
            myuser = bundle.getString("User").toString()
            reponame = bundle.getString("RepoName").toString()
            //  Toast.makeText(activity,myuser , Toast.LENGTH_SHORT).show()
        }
        initViewModel1()
        initViewModel()
        activity?.onBackPressedDispatcher?.addCallback(requireActivity(), object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                view?.findNavController()?.navigate(R.id.action_issuesFragment_to_recyclerListFragment)
            }
        })
        return binding.root
    }


    private fun initViewModel1() {
        binding.apply {
            recyclerView1.layoutManager = LinearLayoutManager(activity)
            val decortion  = DividerItemDecoration(activity, DividerItemDecoration.VERTICAL)
            recyclerView1.addItemDecoration(decortion)

            recyclerAdapter = IssueAdapter()
            recyclerView1.adapter = recyclerAdapter
        }
    }
    private fun initViewModel() {
        PG(true)
        if(myuser.isEmpty() || reponame.isEmpty()){
            Toast.makeText(requireContext(),"No issue found in this Repo",Toast.LENGTH_SHORT).show()
        }else{
            viewModel.setListIssues(myuser,reponame)
        }


        viewModel.getListIssues().observe(requireActivity(), {
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