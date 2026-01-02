package com.movieflix.config;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class AplicationControllerAdvice {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, String> handleArgumentNotValidException (MethodArgumentNotValidException ex) {
    Map<String, String> errorsList = new HashMap<>();

    ex.getBindingResult().getAllErrors().forEach(err ->
            errorsList.put(((FieldError) err).getField() , err.getDefaultMessage())
    );

    return errorsList;
  }


}
