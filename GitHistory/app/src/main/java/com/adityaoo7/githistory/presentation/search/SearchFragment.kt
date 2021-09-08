package com.adityaoo7.githistory.presentation.search

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.adityaoo7.githistory.GitHistoryApp
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.databinding.FragmentSearchBinding
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.transition.MaterialSharedAxis
import javax.inject.Inject

class SearchFragment : Fragment() {

    private lateinit var binding: FragmentSearchBinding

    @Inject
    lateinit var dataSource: IDataSource

    private val model: SearchViewModel by viewModels {
        SearchViewModelFactory(dataSource)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        (requireActivity().application as GitHistoryApp).appComponent.inject(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        exitTransition = MaterialSharedAxis(MaterialSharedAxis.X, true).apply {
            duration =
                resources.getInteger(R.integer.material_motion_duration_long_1).toLong()
        }
        reenterTransition = MaterialSharedAxis(MaterialSharedAxis.Z, false).apply {
            duration =
                resources.getInteger(R.integer.material_motion_duration_long_1).toLong()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentSearchBinding.inflate(inflater, container, false).apply {
            viewModel = model
        }

        model.loading.observe(viewLifecycleOwner, { isLoading ->
            if (isLoading) {
                binding.searchButton.visibility = View.INVISIBLE
                binding.loadingProgressBar.visibility = View.VISIBLE
            } else {
                binding.searchButton.visibility = View.VISIBLE
                binding.loadingProgressBar.visibility = View.INVISIBLE
            }
        })

        model.error.observe(viewLifecycleOwner, { errorMessage ->
            if (errorMessage != null) {
                Snackbar.make(requireView(), errorMessage, Snackbar.LENGTH_INDEFINITE)
                    .setAction("Close") {}
                    .show()
            }
        })

        model.user.observe(viewLifecycleOwner, { user ->
            if (user != null) {
                findNavController().navigate(
                    SearchFragmentDirections.actionSearchFragmentToUserFragment(
                        user
                    )
                )
                model.doneNavigating()
            }
        })

        return binding.root
    }
}