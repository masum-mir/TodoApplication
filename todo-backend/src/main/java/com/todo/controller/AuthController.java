//package com.todo.controller;
//
//
//import com.todo.model.LoginRequest;
//import com.todo.dto.LoginResponse;
//import com.todo.entity.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthService authService;
//
//
//    // User registration endpoint
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        try {
//            User registeredUser = authService.registerNewUser(user);
//            return ResponseEntity.ok(registeredUser);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    // User login endpoint
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
//        try {
//            String token = authService.authenticateUser(
//                    loginRequest.getUsername(),
//                    loginRequest.getPassword()
//            );
//            return ResponseEntity.ok(new LoginResponse(token));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Invalid credentials");
//        }
//    }
//
//
//
//}