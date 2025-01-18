package com.todo.model;

import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.Map;

public class AppResponse<T> {

    private Date timestamp;
    private String details;
    private HttpStatus status;
    private int statusCode;
    private String message;
    private String error;
    private String path;
    private T body;
    private T header;
    private Map<String, Object> metadata;

    private AppResponse() {
    }

    private AppResponse(HttpStatus status) {
        this.status = status;
        this.timestamp = new Date();
    }

    public static <T> AppResponse<T> success(T data, String path) {
        AppResponse<T> response = new AppResponse<>();
        response.status = HttpStatus.OK;
        response.statusCode = HttpStatus.OK.value();
        response.message = "Success";
        response.header = data;
        response.path = path;
        return response;
    }

    public AppResponse<T> addMetadata(String key, Object value) {
        this.metadata.put(key, value);
        return this;
    }

    public AppResponse body(T data) {
        this.body = data;
        return this;
    }

    public AppResponse header(T data) {
        this.header = data;
        return this;
    }

    public AppResponse message(String message) {
        this.message = message;
        return this;
    }
    public AppResponse details(String details) {
        this.details = details;
        return this;
    }

    public AppResponse path(String path) {
        this.path = message;
        return this;
    }


    public static AppResponse build(HttpStatus status) {
        return new AppResponse(status);
    }

    public Integer getStatus() {
        return status.value();
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }

    public Date getTimestamp() {
        return timestamp;
    }


    public T getBody() {
        return body;
    }


    public T getHeader() {
        return header;
    }
}
