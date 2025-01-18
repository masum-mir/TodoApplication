package com.todo.jpa.repo;

import com.todo.jpa.entity.Priority;
import com.todo.jpa.entity.Todo;
import com.todo.jpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface TodoRepo extends JpaRepository<Todo, Integer> {
    List<Todo> findByCompleted(boolean completed);

    List<Todo> findByUserUsernameAndCategory(String username, String category);

    List<Todo> findByUserUsernameAndPriority(String username, Priority priority);

    @Query("SELECT t FROM Todo t WHERE t.user.username = :username AND " +
            "(LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Todo> searchByKeyword(@Param("username") String username, @Param("keyword") String keyword);

    @Query("SELECT t FROM Todo t WHERE t.user.username = :username AND " +
            "(:priority IS NULL OR t.priority = :priority) AND " +
            "(:category IS NULL OR t.category = :category) AND " +
            "(:startDate IS NULL OR t.dueDate >= :startDate) AND " +
            "(:endDate IS NULL OR t.dueDate <= :endDate)")
    List<Todo> filterTasks(@Param("username") String username,
                           @Param("priority") Priority priority,
                           @Param("category") String category,
                           @Param("startDate") LocalDateTime startDate,
                           @Param("endDate") LocalDateTime endDate);

}
