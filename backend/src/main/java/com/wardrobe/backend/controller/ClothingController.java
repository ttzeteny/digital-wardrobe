package com.wardrobe.backend.controller;

import com.wardrobe.backend.dto.ClothingItemRequest;
import com.wardrobe.backend.model.ClothingItem;
import com.wardrobe.backend.service.ClothingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/clothes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ClothingController {

    private final ClothingService clothingService;

    @PostMapping("/add")
    public ResponseEntity<ClothingItem> addClothingItem(@RequestBody ClothingItemRequest request, Principal principal) {
        ClothingItem savedItem = clothingService.addClothingItem(request, principal.getName());
        return ResponseEntity.ok(savedItem);
    }

    @GetMapping("/my-wardrobe")
    public ResponseEntity<List<ClothingItem>> getUserWardrobe(Principal principal) {
        List<ClothingItem> myClothes = clothingService.getUserWardrobe(principal.getName());
        return ResponseEntity.ok(myClothes);
    }
}
