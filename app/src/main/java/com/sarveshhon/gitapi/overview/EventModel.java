package com.sarveshhon.gitapi.overview;

public class EventModel {

    String type;
    String repository;
    String created_at;

    public EventModel() {
    }

    public EventModel(String type, String repository, String created_at) {
        this.type = type;
        this.repository = repository;
        this.created_at = created_at;
    }

    public String getType() {
        return type;
    }

    public String getRepository() {
        return repository.substring(repository.indexOf("/") + 1);
    }

    public String getCreated_at() {
        return created_at;
    }
}
