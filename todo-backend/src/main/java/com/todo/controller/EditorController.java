package com.todo.controller;

import com.todo.jpa.entity.EditorContent;
import com.todo.service.impl.EditorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/editor")
public class EditorComponent {

    @Autowired
    private EditorServiceImpl service;

    @PostMapping("/save")
    public EditorContent saveContent(@RequestBody EditorContent content) {
        return service.saveContent(content);
    }

    @GetMapping("/latest")
    public EditorContent getLatestContent() {
        return service.getLatestContent();
    }
}
