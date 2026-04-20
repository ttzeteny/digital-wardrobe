package com.wardrobe.backend.controller;

import com.wardrobe.backend.dto.UpdateProfileRequest;
import com.wardrobe.backend.model.ClothingItem;
import com.wardrobe.backend.model.User;
import com.wardrobe.backend.repository.ClothingItemRepository;
import com.wardrobe.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final ClothingItemRepository clothingItemRepository;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    @Transactional
    public ResponseEntity<User> updateProfile(@RequestBody UpdateProfileRequest request, Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getUsername() != null) user.setUsername(request.getUsername());
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getPhoneNumber() != null) user.setPhoneNumber(request.getPhoneNumber());
        if (request.getDateOfBirth() != null) user.setDateOfBirth(request.getDateOfBirth());

        if (request.getPreferredCurrency() != null) {
            user.setPreferredCurrency(request.getPreferredCurrency());

            List<ClothingItem> items = clothingItemRepository.findByUserId(user.getId());
            for (ClothingItem item : items) {
                item.setCurrency(request.getPreferredCurrency());
            }
            clothingItemRepository.saveAll(items);
        }

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}