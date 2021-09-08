package com.codechakra.usergitrepository.models;

public class Issue {
    private String created_at;
    private String updated_at;
    private String closed_at;
    private String author_association;
    private String html_url;



    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(String updated_at) {
        this.updated_at = updated_at;
    }

    public String getClosed_at() {
        return closed_at;
    }

    public void setClosed_at(String closed_at) {
        this.closed_at = closed_at;
    }

    public String getAuthor_association() {
        return author_association;
    }

    public void setAuthor_association(String author_association) {
        this.author_association = author_association;
    }

    public String getHtml_url() {
        return html_url;
    }

    public void setHtml_url(String html_url) {
        this.html_url = html_url;
    }
}
