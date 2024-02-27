package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.model.User;
import com.example.demo.repository.TaskRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void addTaskToUser(User user, Task task) {
        user.getTasks().add(task);
    }

    public List<Task> createTaskAndFindAllTasks(Task task) {
        taskRepository.save(task);
        return taskRepository.findAll();
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> findTasksByUserId(Long id) {return taskRepository.findByUser_Id(id);}

    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public void deleteUserTask(User user, Task task) {
        user.getTasks().remove(task);
    }
}
