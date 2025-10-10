package com.example.health.hospital_management.dtos;

public record PatientInformation(
        long id,
        String firstName,
        String lastName,
        String phoneNumber,
        String address,
        String dateOfBirth,
        String biologicalSex,
        String allergies
) {
}