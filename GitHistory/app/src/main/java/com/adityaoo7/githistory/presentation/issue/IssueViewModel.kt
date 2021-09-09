package com.adityaoo7.githistory.presentation.issue

import androidx.lifecycle.*
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.models.Comment
import com.adityaoo7.githistory.models.Issue
import com.adityaoo7.githistory.utils.Result
import com.adityaoo7.githistory.utils.succeeded
import kotlinx.coroutines.launch

/**
 * View model for [IssueFragment]
 * @param dataSource data source which implements [IDataSource]
 * @param issueModel issue model of type [Issue]
 * @param userName user name of owner of this repository
 * @param repoName name of repository of this issue
 * @see IDataSource
 * @see Issue
 */
class IssueViewModel(
    private val dataSource: IDataSource,
    private val issueModel: Issue,
    private val userName: String,
    private val repoName: String
) : ViewModel() {

    private val _issue = MutableLiveData(issueModel)
    val issue: LiveData<Issue> = _issue

    private val _comments = MutableLiveData<List<Comment>>()
    val comments: LiveData<List<Comment>> = _comments

    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading

    private val _error = MutableLiveData<Int>()
    val error: LiveData<Int> = _error

    private fun fetchComments() {
        _loading.value = true
        viewModelScope.launch {
            val result = dataSource.getComments(userName, repoName, issueModel.number)
            if (result.succeeded) {
                val comments = (result as Result.Success).data

                _comments.postValue(comments ?: emptyList())
            } else {
                _error.postValue(R.string.comments_fetch_error)
            }
            _loading.postValue(false)
        }
    }

    val empty: LiveData<Boolean> = Transformations.map(_comments) { comments ->
        comments.isEmpty()
    }

    init {
        fetchComments()
    }

    fun refresh() {
        fetchComments()
    }
}

@Suppress("UNCHECKED_CAST")
class IssueViewModelFactory(
    private val dataSource: IDataSource,
    private val issue: Issue,
    private val userName: String,
    private val repoName: String
) : ViewModelProvider.NewInstanceFactory() {
    override fun <T : ViewModel> create(modelClass: Class<T>) =
        IssueViewModel(dataSource, issue, userName, repoName) as T
}