package com.todo.service;

import com.todo.jpa.entity.ERole;
import com.todo.jpa.entity.Role;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(ERole role);
}
