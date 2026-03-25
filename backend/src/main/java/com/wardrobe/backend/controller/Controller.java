package com.wardrobe.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clothes")
@CrossOrigin(origins = "*")

public class Controller {

    @GetMapping("/test")
    public String testConnection() {
        return "Java Backend is working!";
    }
}