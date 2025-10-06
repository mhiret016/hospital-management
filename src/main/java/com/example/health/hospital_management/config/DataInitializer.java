package com.example.health.hospital_management.config;

import com.example.health.hospital_management.entities.UserCredential;
import com.example.health.hospital_management.entities.enums.HospitalRole;
import com.example.health.hospital_management.repositories.UserCredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserCredentialRepository userCredentialRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            if (userCredentialRepository.count() == 0) {
                UserCredential admin = UserCredential.builder()
                        .email("admin@eva.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(HospitalRole.ADMIN)
                        .build();
                userCredentialRepository.save(admin);
            }
        };
    }
}