package com.todo.controller;

import com.todo.jpa.entity.EditorContent;
import com.todo.jpa.entity.Todo;
import com.todo.model.AppResponse;
import com.todo.service.impl.EditorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/editor")
public class EditorController {

    @Autowired
    private EditorServiceImpl service;

    @GetMapping("/test")
    public String test() {
        return "Testing";
    }

    @GetMapping
    public AppResponse<List<Todo>> getAllTodos(Authentication authentication) {

        try{
            return AppResponse.build(HttpStatus.OK).body(service.getAllContent());
        } catch (Exception e) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message(e.getMessage());
        }
    }

    @PostMapping("/save")
    public EditorContent saveContent(@RequestBody EditorContent content) {
        return service.saveContent(content);
    }

    @GetMapping("/latest")
    public EditorContent getLatestContent() {
        return service.getLatestContent();
    }
}
