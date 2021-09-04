package com.sid.github.model

import com.google.gson.annotations.SerializedName

class Repo{
    @SerializedName("name") var rName : String? = null
    @SerializedName("description") var rDesc : String? = null
    @SerializedName("language") var rLanguage : String? = null
    @SerializedName("stargazers_count") var rStar : String? = null
    @SerializedName("forks_count") var rForks : String? = null

    init {
        setRepoName(rName)
        setRepoDesc(rDesc)
        setRepoLang(rLanguage)
        setRepoStar(rStar)
        setRepoFork(rForks)
    }

    private fun setRepoName(name: String?) {
        this.rName = name
    }

    fun getRepoName() : String?{
        return rName
    }

    private fun setRepoDesc(desc: String?) {
        this.rDesc = desc
    }

    fun getRepoDesc() : String?{
        return rDesc
    }

    private fun setRepoLang(lang: String?) {
        this.rLanguage = lang
    }

    fun getRepoLang() : String?{
        return rLanguage
    }

    private fun setRepoStar(star: String?) {
        this.rStar = star
    }

    fun getRepoStar() : String?{
        return rStar
    }

    private fun setRepoFork(forks: String?) {
        this.rForks = forks
    }

    fun getRepoFork() : String?{
        return rForks
    }

}