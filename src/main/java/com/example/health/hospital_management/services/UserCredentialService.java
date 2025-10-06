package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.AuthRequest;
import com.example.health.hospital_management.dtos.UserInformation;
import com.example.health.hospital_management.entities.UserCredential;
import com.example.health.hospital_management.entities.enums.HospitalRole;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialService {
    private final UserCredentialRepository userCredentialRepository;
    private final PasswordEncoder passwordEncoder;

    public UserInformation createUserCredential(AuthRequest authRequest) {
        UserCredential userCredential = UserCredential.builder()
                .email(authRequest.email().toLowerCase())
                .password(passwordEncoder.encode(authRequest.password()))
                .role(HospitalRole.PATIENT)
                .build();
        userCredential = userCredentialRepository.save(userCredential);
        return new UserInformation(userCredential.getEmail());

    }
}
