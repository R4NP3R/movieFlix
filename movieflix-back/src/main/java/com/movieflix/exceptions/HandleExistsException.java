package com.movieflix.exceptions;

public class HandleExistsException extends RuntimeException{
    public HandleExistsException(String message) {
        super(message);
    }
}
