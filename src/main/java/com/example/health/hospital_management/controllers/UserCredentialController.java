package com.example.health.hospital_management.controllers;

import com.example.health.hospital_management.dtos.AuthRequest;
import com.example.health.hospital_management.services.UserCredentialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class UserCredentialController {
    private final UserCredentialService userCredentialService;

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("newUser", new AuthRequest(email: "", password: ""));
        return "auth/register";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute("newUser") AuthRequest request) {
        userCredentialService.createUserCredential(request);
        return "redirect:/login";
    }
}
