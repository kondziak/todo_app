package com.example.demo.controller;

import com.example.demo.dto.JWTAuthResponse;
import com.example.demo.dto.LoginDTO;
import com.example.demo.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> authenticate(@RequestBody LoginDTO loginDTO) {
       String token = authService.login(loginDTO);
        log.info("isTokenEmpty: " + token.isEmpty());
        if (token.isEmpty()) {
            log.info("SendingBadRequest");
            return ResponseEntity.badRequest().body(new JWTAuthResponse("Bad credentials","Bearer"));
        }
        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setToken(token);
        return ResponseEntity.ok(jwtAuthResponse);
    }
}
