package com.android.androidcoroutinedemokotlin.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.navigation.findNavController
import com.android.androidcoroutinedemokotlin.R


class NotAvailableFragment : Fragment(R.layout.fragment_not_available) {


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        activity?.onBackPressedDispatcher?.addCallback(requireActivity(), object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                view?.findNavController()?.navigate(R.id.action_notAvailableFragment_to_recyclerListFragment)
            }
        })
        return inflater.inflate(R.layout.fragment_not_available, container, false)
    }


}