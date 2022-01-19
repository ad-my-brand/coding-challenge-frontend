package com.android.androidcoroutinedemokotlin.fragments

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.findNavController
import com.android.androidcoroutinedemokotlin.R


class AnimeFragment : Fragment() {


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment

        Handler(Looper.getMainLooper()).postDelayed({
            view?.findNavController()?.navigate(R.id.action_animeFragment_to_recyclerListFragment)

        }, 2000)
        return inflater.inflate(R.layout.fragment_anime, container, false)
    }


}