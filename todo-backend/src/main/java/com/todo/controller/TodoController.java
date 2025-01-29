package com.todo.controller;

import com.todo.jpa.entity.Priority;
import com.todo.jpa.entity.Todo;
import com.todo.jpa.entity.User;
import com.todo.model.AppResponse;
import com.todo.service.TodoService;
import com.todo.service.impl.TodoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoServiceImpl todoService;

    @GetMapping("/test")
    public String test() {
        return "Testing";
    }


    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_MODERATOR') or hasRole('ROLE_ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('ROLE_MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping
    public AppResponse<List<Todo>> getAllTodos(Authentication authentication) {

        try{
            return AppResponse.build(HttpStatus.OK).body(todoService.getAllTodos());
        } catch (Exception e) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message(e.getMessage());
        }
    }

    @PostMapping("/save")
    public AppResponse createTodo(Authentication authentication, @RequestBody Todo todo) {

        try {
            return AppResponse.build(HttpStatus.OK).body(todoService.createTodo(authentication, todo));
        }catch (Exception e) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message(e.getMessage());
        }
       }

    @PutMapping("/{id}")
    public AppResponse updateTodo(@PathVariable int id, @RequestBody Todo todoDetails) {
        try {
            return AppResponse.build(HttpStatus.OK).body(todoService.updateTodo(id, todoDetails));
        } catch (Exception e) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public AppResponse deleteTodo(@PathVariable int id) {
        try {
            todoService.deleteTodo(id);
            return AppResponse.build(HttpStatus.OK).message("Delete Successfully");
        } catch (Exception e) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public AppResponse getTodoById(@PathVariable int id) {
        try {
            return AppResponse.build(HttpStatus.OK).body(todoService.getTodoById(id));
        } catch (Exception e) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message(e.getMessage());
        }
    }

    @GetMapping("/completed")
    public AppResponse<List<Todo>> getCompletedTodos() {
        return AppResponse.build(HttpStatus.OK).body(todoService.getCompletedTodos());
    }

    @GetMapping("/pending")
    public AppResponse<List<Todo>> getPendingTodos() {
        return AppResponse.build(HttpStatus.OK).body(todoService.getPendingTodos());
    }

    @GetMapping("/search")
    public AppResponse<List<Todo>> searchTasks(Authentication authentication, @RequestParam String keyword) {
        String name = authentication.getName();

        return AppResponse.build(HttpStatus.OK).body(todoService.searchTasks(name, keyword));
    }

    @GetMapping("/filter")
    public AppResponse<List<Todo>> filterTasks( Authentication authentication, @RequestParam(required = false) Priority priority,
                                                @RequestParam(required = false) String category,
                                                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
                                                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        String username = authentication.getName();
        List<Todo> todos = todoService.filterTasks(username, priority, category, startDate, endDate);
        return AppResponse.build(HttpStatus.OK).body(todos);
    }


}