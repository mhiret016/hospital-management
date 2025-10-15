package com.example.health.hospital_management.controllers;

import com.example.health.hospital_management.dtos.AuthRequest;
import com.example.health.hospital_management.dtos.UserInformation;
import com.example.health.hospital_management.services.UserCredentialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserCredentialController {
    private final UserCredentialService userCredentialService;

    @PostMapping("/register")
    public ResponseEntity<UserInformation> register(@Valid @RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(userCredentialService.createUserCredentials(authRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(userCredentialService.login(request));
    }
}