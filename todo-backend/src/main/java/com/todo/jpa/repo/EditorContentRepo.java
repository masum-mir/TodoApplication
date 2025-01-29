package com.todo.jpa.repo;

import com.todo.jpa.entity.EditorContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditorContentRepo extends JpaRepository<EditorContent, Long> {

}
