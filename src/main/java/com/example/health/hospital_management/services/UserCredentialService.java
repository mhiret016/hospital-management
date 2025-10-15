package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.AuthRequest;
import com.example.health.hospital_management.dtos.UserInformation;
import com.example.health.hospital_management.entities.UserCredential;
import com.example.health.hospital_management.entities.enums.HospitalRole;
import com.example.health.hospital_management.repositories.UserCredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCredentialService {
    private final UserCredentialRepository userCredentialRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserInformation createUserCredentials(AuthRequest authRequest) {
        UserCredential userCredential = UserCredential.builder()
                .email(authRequest.email().toLowerCase())
                .password(passwordEncoder.encode(authRequest.password()))
                .role(HospitalRole.PATIENT)
                .build();
        userCredential = userCredentialRepository.save(userCredential);
        return new UserInformation(userCredential.getEmail());
    }

    public String login(AuthRequest request) {
        // 1. Authenticate credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // 2. Load full user entity (so we can include authorities in token)
        UserCredential user = userCredentialRepository
                .findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Generate JWT token with full user details
        return jwtService.generateToken(user.getEmail());
    }
}