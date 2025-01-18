package com.todo.jpa.repo;

import com.todo.jpa.entity.ERole;
import com.todo.jpa.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo  extends JpaRepository<Role, Long> {
    Optional<Role> findRoleByName(ERole name);
}