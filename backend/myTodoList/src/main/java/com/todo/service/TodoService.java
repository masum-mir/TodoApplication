package com.todo.service;

import com.todo.jpa.entity.Priority;
import com.todo.jpa.entity.Todo;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TodoService {

    public Todo createTodo(Authentication authentication, Todo todo);
    public List<Todo> getAllTodos();
    public Todo updateTodo(int id, Todo todoDetails);
    public void deleteTodo(int id);
    public Optional<Todo> getTodoById(int id);
    public List<Todo> getCompletedTodos();
    public List<Todo> getPendingTodos();
    public List<Todo> searchTasks(String username, String keyword);
    public List<Todo> filterTasks(String username, Priority priority, String category, LocalDateTime startDate, LocalDateTime endDate);


}

/***
 * 1. Search and Filter Functionality
 * 2. Task Organization
 * 3. Reminder and Notification System
 * 4. Task Progress Tracking
 */