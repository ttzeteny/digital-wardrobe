package com.wardrobe.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "clothing_items")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ClothingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category;

    private String season;

    private String color;

    private String brand;

    private String imageUrl;

    private Double price;

    private Integer wearCount = 0;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}