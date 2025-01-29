package com.todo.service.impl;

import com.todo.jpa.entity.Priority;
import com.todo.jpa.entity.Todo;
import com.todo.jpa.entity.User;
import com.todo.jpa.repo.TodoRepo;
import com.todo.jpa.repo.UserRepo;
import com.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoRepo todoRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public Todo createTodo(Authentication authentication, Todo todo) {
        String name = authentication.getName();

        User user = userRepo.findByUsername(name).orElseThrow(()-> new RuntimeException("User not found"));

        todo.setUser(user);
        todo.setPriority(todo.getPriority() != null ? todo.getPriority() : Priority.MEDIUM);

        return todoRepo.save(todo);
    }

    public List<Todo> getAllTodos() {

        return todoRepo.findAll();
    }

    public Todo updateTodo(int id, Todo todo) {
        Todo existingTodo = todoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: "+id));

        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setCompleted(todo.isCompleted());

        return todoRepo.save(existingTodo);
    }

    public void deleteTodo(int id) {
        Todo todo = todoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: "+id));

        todoRepo.delete(todo);
    }

    public Optional<Todo> getTodoById(int id) {
        return Optional.ofNullable(todoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id)));
    }

    @Override
    public List<Todo> getCompletedTodos() {
        return todoRepo.findByCompleted(true);
    }

    @Override
    public List<Todo> getPendingTodos() {
        return todoRepo.findByCompleted(false);
    }

    @Override
    public List<Todo> searchTasks(String username, String keyword) {
        return todoRepo.searchByKeyword(username, keyword);
    }

    @Override
    public List<Todo> filterTasks(String username, Priority priority, String category, LocalDateTime startDate, LocalDateTime endDate) {
        return todoRepo.filterTasks(username, priority, category, startDate, endDate);
    }
// /*** add this functionality
//    @GetMapping("/category/{category}")
//    public ResponseEntity<ApiResponse<List<Todo>>> getTodosByCategory(Authentication authentication, @PathVariable String category) {
//        String username = authentication.getName();
//        List<Todo> todos = todoRepository.findByUserUsernameAndCategory(username, category);
//        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Tasks fetched successfully", todos));
//    }
//
//    @GetMapping("/priority/{priority}")
//    public ResponseEntity<ApiResponse<List<Todo>>> getTodosByPriority(Authentication authentication, @PathVariable Todo.Priority priority) {
//        String username = authentication.getName();
//        List<Todo> todos = todoRepository.findByUserUsernameAndPriority(username, priority);
//        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), "Tasks fetched successfully", todos));
//    }

}
