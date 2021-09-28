package com.harivansh.gitinfo;

public class InputValidator {


    public static Object isValid(String userName) {
        return !(userName.length() == 0);
    }
}
