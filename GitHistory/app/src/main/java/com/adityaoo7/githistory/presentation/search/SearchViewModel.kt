package com.adityaoo7.githistory.presentation.search

import androidx.lifecycle.*
import com.adityaoo7.githistory.R
import com.adityaoo7.githistory.data.source.IDataSource
import com.adityaoo7.githistory.models.User
import com.adityaoo7.githistory.utils.Result
import com.adityaoo7.githistory.utils.succeeded
import kotlinx.coroutines.launch

/**
 * View model for [SearchFragment]
 * @param dataSource data source which implements [IDataSource]
 */
class SearchViewModel(val dataSource: IDataSource) : ViewModel() {

    private val _loading = MutableLiveData(false)
    val loading: LiveData<Boolean> = _loading

    val userName = MutableLiveData<String>()

    private val _user = MutableLiveData<User?>()
    val user: LiveData<User?> = _user

    private val _error = MutableLiveData<Int>()
    val error: LiveData<Int> = _error

    fun onSearch() {
        if (userName.value == null || userName.value!!.isEmpty()) {
            _error.value = R.string.empty_field_error
            return
        }
        _loading.value = true
        viewModelScope.launch {
            val result = dataSource.getUser(userName.value!!)
            if (result.succeeded) {
                val user = (result as Result.Success).data!!
                _user.postValue(user)
            } else {
                _error.postValue(R.string.user_fetch_error)
            }
            _loading.postValue(false)
        }

    }

    fun doneNavigating() {
        _user.value = null
    }
}

@Suppress("UNCHECKED_CAST")
class SearchViewModelFactory(
    private val dataSource: IDataSource
) : ViewModelProvider.NewInstanceFactory() {
    override fun <T : ViewModel> create(modelClass: Class<T>) = SearchViewModel(dataSource) as T
}