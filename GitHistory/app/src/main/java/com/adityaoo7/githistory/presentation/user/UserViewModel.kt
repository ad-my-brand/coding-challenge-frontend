package com.adityaoo7.githistory.presentation.user

import androidx.lifecycle.*
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.models.User
import com.adityaoo7.githistory.utils.Result
import com.adityaoo7.githistory.utils.succeeded
import kotlinx.coroutines.launch

/**
 * View model for [UserFragment]
 * @param dataSource data source which implements [IDataSource]
 * @param userModel user model of type [User]
 * @see IDataSource
 * @see User
 */

class UserViewModel(private val dataSource: IDataSource, private val userModel: User) :
    ViewModel() {

    private val _user = MutableLiveData(userModel)
    val user: LiveData<User> = _user

    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading

    private val _error = MutableLiveData<Int>()
    val error: LiveData<Int> = _error

    private val _repositories = MutableLiveData<List<Repository>>()
    val repositories: LiveData<List<Repository>> = _repositories

    private fun fetchRepositories() {
        _loading.value = true
        viewModelScope.launch {
            val result = dataSource.getRepositories(userModel.userName)
            if (result.succeeded) {
                val repos = (result as Result.Success).data
                _repositories.postValue(repos ?: emptyList())
            } else {
                _error.postValue(R.string.repos_fetch_error)
            }
            _loading.postValue(false)
        }
    }

    val empty: LiveData<Boolean> = Transformations.map(_repositories) { repositories ->
        repositories.isEmpty()
    }

    init {
        fetchRepositories()
    }

    fun refresh() {
        fetchRepositories()
    }

    private val _navigateToRepository = MutableLiveData<Repository?>()
    val navigateToRepository: LiveData<Repository?> = _navigateToRepository

    fun navigateToRepositoryScreen(repository: Repository) {
        _navigateToRepository.value = repository
    }

    fun doneNavigating() {
        _navigateToRepository.value = null
    }
}

@Suppress("UNCHECKED_CAST")
class UserViewModelFactory(
    private val dataSource: IDataSource,
    private val user: User
) : ViewModelProvider.NewInstanceFactory() {
    override fun <T : ViewModel> create(modelClass: Class<T>) = UserViewModel(dataSource, user) as T
}