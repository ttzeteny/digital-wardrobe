package com.wardrobe.backend.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String username;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String dateOfBirth;
    private String bio;
}