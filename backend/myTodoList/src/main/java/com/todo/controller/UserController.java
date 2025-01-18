package com.todo.controller;

import com.todo.model.LoginRequest;
import com.todo.dto.UserDto;
import com.todo.jpa.repo.RoleRepo;
import com.todo.jpa.repo.UserRepo;
import com.todo.model.AppResponse;
import com.todo.service.impl.UserServiceImpl;
import com.todo.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtTokenUtil;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/test")
    public String test() {
        return "Testing";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public AppResponse generateToken(@RequestBody LoginRequest loginUser) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateJwtToken(authentication);

        return AppResponse.build(HttpStatus.OK).message(token);
    }

    @RequestMapping(value="/register", method = RequestMethod.POST)
    public AppResponse saveUser(@RequestBody UserDto user){

        if(userRepo.existsByUsername(user.getUsername())) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message("Error: Username is already taken!");
        }

        if (userRepo.existsByEmail(user.getEmail())) {
            return AppResponse.build(HttpStatus.UNAUTHORIZED).message("Error: Email is already in use!");
        }

        return AppResponse.build(HttpStatus.OK).body(userService.save(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/adminping", method = RequestMethod.GET)
    public String adminPing(){
        return "Only Admins Can Read This";
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value="/userping", method = RequestMethod.GET)
    public String userPing(){
        return "Any User Can Read This";
    }


}
