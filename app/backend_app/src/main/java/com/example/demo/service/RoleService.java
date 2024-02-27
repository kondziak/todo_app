package com.example.demo.service;

import com.example.demo.model.priviliges.Role;
import com.example.demo.repository.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleService {

    private final RoleRepository roleRepository;

    public Optional<Role> findUserRole() {
        return roleRepository.findByName("USER");
    }

    public Optional<Role> findAdminRole() {
        return roleRepository.findByName("ADMIN");
    }
}
