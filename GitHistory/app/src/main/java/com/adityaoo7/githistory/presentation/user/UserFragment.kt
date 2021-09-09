package com.adityaoo7.githistory.presentation.user

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.adityaoo7.githistory.GitHistoryApp
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.databinding.FragmentUserBinding
import com.bumptech.glide.Glide
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.transition.MaterialSharedAxis
import javax.inject.Inject

class UserFragment : Fragment() {

    private lateinit var binding: FragmentUserBinding

    private val args: UserFragmentArgs by navArgs()

    @Inject
    lateinit var dataSource: IDataSource


    private val model: UserViewModel by viewModels {
        UserViewModelFactory(dataSource, args.user)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        (requireActivity().application as GitHistoryApp).appComponent.inject(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enterTransition = MaterialSharedAxis(MaterialSharedAxis.X, true).apply {
            duration = resources.getInteger(R.integer.material_motion_duration_long_1).toLong()
        }

        reenterTransition = MaterialSharedAxis(MaterialSharedAxis.X, false).apply {
            duration =
                resources.getInteger(R.integer.material_motion_duration_long_1).toLong()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentUserBinding.inflate(inflater, container, false).apply {
            viewModel = model
        }

        val user = args.user

        Glide.with(this).load(user.avatarUrl).into(binding.avatarImageView)

        val adapter = RepositoryListAdapter(model)


        binding.repositoryList.adapter = adapter

        binding.repositoryListRefreshLayout.setOnRefreshListener {
            model.refresh()
        }

        model.repositories.observe(viewLifecycleOwner, { repositories ->
            adapter.submitList(repositories)
        })

        model.loading.observe(viewLifecycleOwner, { isLoading ->
            if (isLoading) {
                binding.loadingReposProgressBar.visibility = View.VISIBLE
                binding.repositoryList.visibility = View.INVISIBLE
            } else {
                binding.loadingReposProgressBar.visibility = View.GONE
                binding.repositoryList.visibility = View.VISIBLE
                binding.repositoryListRefreshLayout.isRefreshing = false
            }
        })

        model.error.observe(viewLifecycleOwner, { errorMessage ->
            if (errorMessage != null) {
                Snackbar.make(requireView(), errorMessage, Snackbar.LENGTH_INDEFINITE)
                    .setAction("Close") {}
                    .show()
            }
        })

        model.navigateToRepository.observe(viewLifecycleOwner, { repository ->
            if (repository != null) {
                findNavController().navigate(
                    UserFragmentDirections.actionUserFragmentToRepositoryFragment(
                        repository,
                        user.userName
                    )
                )
                model.doneNavigating()
            }
        })

        model.empty.observe(viewLifecycleOwner, { isEmpty ->
            if (isEmpty) {
                binding.repositoryListRefreshLayout.visibility = View.GONE
                binding.emptyRepoListTextView.visibility = View.VISIBLE
            } else {
                binding.repositoryListRefreshLayout.visibility = View.VISIBLE
                binding.emptyRepoListTextView.visibility = View.GONE
            }
        })

        return binding.root
    }
}