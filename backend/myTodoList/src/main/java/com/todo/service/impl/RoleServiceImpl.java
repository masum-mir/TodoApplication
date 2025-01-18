package com.todo.service.impl;

import com.todo.jpa.entity.ERole;
import com.todo.jpa.entity.Role;
import com.todo.jpa.repo.RoleRepo;
import com.todo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepo roleRepo;

    @Override
    public Optional<Role> findByName(ERole name) {
        Optional<Role> role = roleRepo.findRoleByName(name);
        return role;
    }
}
