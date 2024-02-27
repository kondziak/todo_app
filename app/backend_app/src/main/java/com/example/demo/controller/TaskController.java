package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/")
    public ResponseEntity<List<Task>> getTasks() {
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return new ResponseEntity<>(taskService.findTaskById(Long.valueOf(id)).orElse(null),HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Task>> getTaskByUserId(@PathVariable String id) {
        return new ResponseEntity<>(taskService.findTasksByUserId(Long.valueOf(id)),HttpStatus.OK);
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return new ResponseEntity<>(taskService.createTask(task),HttpStatus.CREATED);
    }

    @PostMapping("/user/{id}/create")
    public ResponseEntity<List<Task>>  createTaskAndFindAllTasks(@RequestBody Task task, @PathVariable String id) {
        return new ResponseEntity<>(taskService.createTaskAndFindAllTasks(task),HttpStatus.CREATED);
    }
}
