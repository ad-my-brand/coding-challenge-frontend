package com.adityaoo7.githistory.presentation.repository

import androidx.lifecycle.*
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.models.Repository
import com.adityaoo7.githistory.utils.Result
import com.adityaoo7.githistory.utils.succeeded
import kotlinx.coroutines.launch

/**
 * View model for [RepositoryFragment]
 * @param dataSource data source which implements [IDataSource]
 * @param repositoryModel repository model of type [Repository]
 * @param userName user name of owner of this repository
 * @see IDataSource
 * @see Repository
 */
class RepositoryViewModel(
    private val dataSource: IDataSource,
    private val repositoryModel: Repository,
    private val userName: String
) : ViewModel() {

    private val _repository = MutableLiveData(repositoryModel)
    val repository: LiveData<Repository> = _repository

    private val _issues = MutableLiveData<List<Issue>>()
    val issues: LiveData<List<Issue>> = _issues

    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading

    private val _error = MutableLiveData<Int>()
    val error: LiveData<Int> = _error

    private fun fetchIssues() {
        _loading.value = true
        viewModelScope.launch {
            val result = dataSource.getIssues(userName, repositoryModel.name)
            if (result.succeeded) {
                val issues = (result as Result.Success).data
                _issues.postValue(issues ?: emptyList())
            } else {
                _error.postValue(R.string.issues_fetch_error)
            }
            _loading.postValue(false)
        }
    }

    val empty: LiveData<Boolean> = Transformations.map(_issues) { issues ->
        issues.isEmpty()
    }

    init {
        fetchIssues()
    }

    fun refresh() {
        fetchIssues()
    }

    private val _navigateToIssue = MutableLiveData<Issue?>()
    val navigateToIssue: LiveData<Issue?> = _navigateToIssue

    fun navigateToIssueScreen(issue: Issue) {
        _navigateToIssue.value = issue
    }

    fun doneNavigating() {
        _navigateToIssue.value = null
    }
}

@Suppress("UNCHECKED_CAST")
class RepositoryViewModelFactory(
    private val dataSource: IDataSource,
    private val repository: Repository,
    private val userName: String
) : ViewModelProvider.NewInstanceFactory() {
    override fun <T : ViewModel> create(modelClass: Class<T>) =
        RepositoryViewModel(dataSource, repository, userName) as T
}