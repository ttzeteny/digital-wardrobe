package com.wardrobe.backend.controller;

import com.wardrobe.backend.dto.LoginRequest;
import com.wardrobe.backend.dto.RegisterRequest;
import com.wardrobe.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegisterRequest request) {

        try {
            String result = authService.register(request);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginRequest request) {

        try {
            String result = authService.login(request);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }
}
