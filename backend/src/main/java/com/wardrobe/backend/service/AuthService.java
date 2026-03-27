package com.wardrobe.backend.service;

import com.wardrobe.backend.dto.LoginRequest;
import com.wardrobe.backend.dto.RegisterRequest;
import com.wardrobe.backend.model.User;
import com.wardrobe.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "Registered successfully";
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Wrong email or password!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong email or password!");
        }

        return "Logged in successfully";
    }
}
