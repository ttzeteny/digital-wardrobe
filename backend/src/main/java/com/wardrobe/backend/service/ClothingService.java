package com.wardrobe.backend.service;

import com.wardrobe.backend.dto.ClothingItemRequest;
import com.wardrobe.backend.model.ClothingItem;
import com.wardrobe.backend.model.User;
import com.wardrobe.backend.repository.ClothingItemRepository;
import com.wardrobe.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingService {

    private final ClothingItemRepository clothingItemRepository;
    private final UserRepository userRepository;

    public ClothingItem addClothingItem(ClothingItemRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));

        ClothingItem item = new ClothingItem();

        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setColor(request.getColor());
        item.setBrand(request.getBrand());
        item.setSize(request.getSize());
        item.setTags(request.getTags());
        item.setImageUrl(request.getImageUrl());
        item.setPrice(request.getPrice());
        item.setCurrency(request.getCurrency() != null ? request.getCurrency() : "USD");
        item.setUser(user);

        return clothingItemRepository.save(item);
    }

    @Transactional(readOnly = true)
    public List<ClothingItem> getUserWardrobe(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return clothingItemRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    @Transactional(readOnly = true)
    public ClothingItem getClothingItem(Long id, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ClothingItem item = clothingItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to this item");
        }

        return item;
    }

    @Transactional
    public void deleteClothingItem(Long id, String userEmail) {
        ClothingItem item = getClothingItem(id, userEmail);
        clothingItemRepository.delete(item);
    }

    @Transactional
    public ClothingItem updateClothingItem(Long id, ClothingItemRequest request, String userEmail) {
        ClothingItem item = getClothingItem(id, userEmail);

        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setColor(request.getColor());
        item.setBrand(request.getBrand());
        item.setSize(request.getSize());
        item.setCurrency(request.getCurrency());
        item.setPrice(request.getPrice());

        return clothingItemRepository.save(item);
    }
}
