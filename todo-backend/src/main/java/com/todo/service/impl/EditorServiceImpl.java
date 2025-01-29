package com.todo.service.impl;

import com.todo.jpa.entity.EditorContent;
import com.todo.jpa.repo.EditorContentRepo;
import com.todo.service.EditorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditorServiceImpl implements EditorService {

    @Autowired
    private EditorContentRepo repo;

    @Override
    public EditorContent saveContent(EditorContent content) {
        return repo.save(content);
    }

    @Override
    public EditorContent getLatestContent() {
        return repo.findAll().stream().reduce((first, second) -> second).orElse(null);
    }

    @Override
    public List<EditorContent> getAllContent() {
        return repo.findAll();
    }

    @Override
    public EditorContent getEditorContentById(long id) {
        return null;
    }

    @Override
    public EditorContent updateEditorContent(long id, EditorContent content) {
        return null;
    }

    @Override
    public EditorContent deleteEditorContentById(long id) {
        return null;
    }
}
