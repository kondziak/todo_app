package com.example.demo.service;

import com.example.demo.dto.RegisterDTO;
import com.example.demo.model.User;
import com.example.demo.model.priviliges.Role;
import com.example.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final RoleService roleService;

    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserByEmail(String email) {return userRepository.findByEmail(email);}

    public User createUser(RegisterDTO registerDTO) {
        Set<Role> roles = new HashSet<>();
        Optional<Role> role = roleService.findUserRole();
        role.ifPresent(roles::add);

        User user = User.builder()
                .email(registerDTO.getEmail())
                .name(registerDTO.getName())
                .lastname(registerDTO.getLastname())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .tasks(new HashSet<>())
                .roles(roles)
                .build();

        return userRepository.save(user);
    }
}
