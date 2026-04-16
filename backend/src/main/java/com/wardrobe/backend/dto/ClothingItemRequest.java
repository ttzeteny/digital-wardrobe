package com.wardrobe.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClothingItemRequest {
    private String name;
    private String category;
    private String color;
    private String brand;
    private String size;
    private List<String> tags;
    private String imageUrl;
    private Double price;
    private String currency;
}