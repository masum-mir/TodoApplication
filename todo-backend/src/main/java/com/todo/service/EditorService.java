package com.todo.service;

import com.todo.jpa.entity.EditorContent;

import java.util.List;

public interface EditorService {
    public EditorContent saveContent(EditorContent content);
    public EditorContent getLatestContent();
    public List<EditorContent> getAllContent();
    public EditorContent getEditorContentById(long id);
    public EditorContent updateEditorContent(long id, EditorContent content);
    public EditorContent deleteEditorContentById(long id);
}
