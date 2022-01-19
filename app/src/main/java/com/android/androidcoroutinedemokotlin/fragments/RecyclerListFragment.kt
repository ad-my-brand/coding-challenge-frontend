package com.android.androidcoroutinedemokotlin.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.androidcoroutinedemokotlin.adapter.RecyclerViewAdapter
import com.android.androidcoroutinedemokotlin.databinding.FragmentRecyclerListBinding
import com.android.androidcoroutinedemokotlin.viewmodel.MainActivityViewModel

import androidx.core.widget.addTextChangedListener
import android.net.Uri
import androidx.activity.OnBackPressedCallback
import androidx.navigation.findNavController
import com.android.androidcoroutinedemokotlin.R


/**
 * A simple [Fragment] subclass.
 * Use the [RecyclerListFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class RecyclerListFragment : Fragment(R.layout.fragment_recycler_list) {
    private lateinit var viewModel:MainActivityViewModel
    private lateinit var recyclerAdapter : RecyclerViewAdapter
    private lateinit var binding: FragmentRecyclerListBinding
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        binding =  DataBindingUtil.inflate(inflater,
            R.layout.fragment_recycler_list, container, false)
        viewModel=ViewModelProvider(this,ViewModelProvider.NewInstanceFactory()).get(MainActivityViewModel::class.java)
        val viewModel  = ViewModelProvider(this).get(MainActivityViewModel::class.java)
        initViewModel1()
        initViewModel()
       binding.butt.setOnClickListener(){
           Search()
       }
        binding.search.addTextChangedListener{
            if(it.toString().isEmpty()){
                viewModel.makeApiCall("tom")
            }
        }

       recyclerAdapter.setonItemClickListner(object:RecyclerViewAdapter.onItemClickListner{
           override fun onItemClicked(position: Int) {
//               val url = "https://github.com/"+ recyclerAdapter.items[position].name +"?tab=repositories"
//               val i = Intent(Intent.ACTION_VIEW)
//               i.data = Uri.parse(url)
//               startActivity(i)
               val bundel=Bundle().apply {
                   putSerializable("UserName",recyclerAdapter.items[position].login)
               }
               view?.findNavController()?.navigate(R.id.action_recyclerListFragment_to_repoFragment,bundel)

           }

       })
        activity?.onBackPressedDispatcher?.addCallback(requireActivity(), object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                getActivity()?.finish();
            }
        })

        return binding.root

    }

    private fun initViewModel1() {
        binding.apply {
            recyclerView.layoutManager = LinearLayoutManager(activity)
            val decortion  = DividerItemDecoration(activity, DividerItemDecoration.VERTICAL)
            recyclerView.addItemDecoration(decortion)

            recyclerAdapter = RecyclerViewAdapter()
            recyclerView.adapter = recyclerAdapter
        }
    }

    private fun initViewModel() {

        viewModel.getRecyclerListObserver().observe(requireActivity(), {
            if(it != null) {
                PG(false)
                recyclerAdapter.setUpdatedData(it)
                val name:String=it[0].name
            } else {
                Toast.makeText(activity, "Error in getting data", Toast.LENGTH_SHORT).show()
            }
        })
      Search()
    }
    companion object {

        @JvmStatic
        fun newInstance() =
                RecyclerListFragment()
    }
    private fun Search(){
        binding.apply {
            val query=search.text.toString()
            if(!query.isEmpty()){
                PG(true)
                viewModel.makeApiCall(binding.search.text.toString())
            }else{
                PG(true)
                viewModel.makeApiCall("tom")
            }
        }
    }
    private  fun PG(state:Boolean){
        if(state){
            binding.progressBar.visibility=View.VISIBLE
        }else{
            binding.progressBar.visibility=View.GONE
        }
    }
}