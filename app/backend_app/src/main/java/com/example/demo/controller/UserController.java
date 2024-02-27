package com.example.demo.controller;

import com.example.demo.dto.RegisterDTO;
import com.example.demo.model.Task;
import com.example.demo.model.User;
import com.example.demo.service.TaskService;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"},allowedHeaders = "*",maxAge = 3600)
@RequestMapping("/api")
@Slf4j
public class UserController {

    private final UserService userService;

    private final TaskService taskService;


    @GetMapping("/users/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        Optional<User> user = userService.findUserById(Long.valueOf(id));
        return new ResponseEntity<>(user.orElse(null), HttpStatus.OK);
    }

    @GetMapping("/users/find")
    public ResponseEntity<User> findUserByEmail(@RequestParam String email) {
        log.info("Finding user by email:" + email);
        Optional<User> user = userService.findUserByEmail(email);
        return new ResponseEntity<>(user.orElse(null),HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@Valid @RequestBody RegisterDTO registerDTO) {
        User user = userService.createUser(registerDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/users/{id}/tasks")
    public ResponseEntity<List<Task>> getUserTasks(@PathVariable String id) {
        Optional<User> user = userService.findUserById(Long.valueOf(id));
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.get().getTasks().stream().toList(), HttpStatus.OK);
    }

    @PostMapping("/users/{id}/tasks")
    public ResponseEntity<?> addUserTask(@PathVariable String id, @RequestBody Task task) {
        log.info("Creating task for user:" + id);
        Optional<User> user = userService.findUserById(Long.valueOf(id));
        if (user.isEmpty()) {
            return new ResponseEntity<>("User couldn't be found!", HttpStatus.NOT_FOUND);
        }
        task.setUser(user.get());
        taskService.addTaskToUser(user.get(),taskService.createTask(task));
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}/tasks/{taskId}")
    public ResponseEntity<?> deleteUserTask(@PathVariable String id, @PathVariable String taskId) {
        Optional<User> user = userService.findUserById(Long.valueOf(id));
        if (user.isEmpty()) {
            return new ResponseEntity<>("User couldn't be found", HttpStatus.NOT_FOUND);
        }
        Optional<Task> foundTask = user.get().getTasks().stream()
                .filter(t -> t.getId().equals(Long.valueOf(taskId)))
                .findFirst();
        if (foundTask.isEmpty()) {
            return new ResponseEntity<>("Task couldn't be found", HttpStatus.NOT_FOUND);
        }
        log.info("Task:" + foundTask.get().getTaskId());
        taskService.deleteUserTask(user.get(),foundTask.get());
        log.info("User tasks:" + user.get().getTasks().size());
        log.info("Task deleted successfully");
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }
}
