package com.example.health.hospital_management.dtos;

public record PatientInformation(
        Long id,
        String firstName,
        String lastName,
        String dateOfBirth,
        String biologicalSex,
        String phoneNumber,
        String address,
        String allergies
) {
}
