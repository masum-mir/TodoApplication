package com.todo.service;

import com.todo.dto.UserDto;
import com.todo.jpa.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User save(UserDto user);
    List<User> findAll();
    Optional<User> findOne(String username);
}
