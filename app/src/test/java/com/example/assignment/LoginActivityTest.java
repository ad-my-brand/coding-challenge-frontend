package com.example.assignment;

import static com.google.common.truth.Truth.assertThat;

import org.junit.Test;

public class LoginActivityTest {

    @Test
    public void usernameIsEmpty(){
        boolean username = LoginActivity.userNameIsValid("");
        assertThat(username).isFalse();
    }

    @Test
    public void usernameIsNotEmpty(){
        boolean username = LoginActivity.userNameIsValid("xyz");
        assertThat(username).isTrue();
    }
}