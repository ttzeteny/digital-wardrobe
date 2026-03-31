package com.wardrobe.backend.dto;

import lombok.Data;

@Data
public class ClothingItemRequest {
    private String name;
    private String category;
    private String color;
    private String brand;
    private String imageUrl;
    private Double price;
}