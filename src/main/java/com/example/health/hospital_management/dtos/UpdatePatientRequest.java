package com.example.health.hospital_management.dtos;


import java.util.List;

public record UpdatePatientRequest(
        String firstName,
        String lastName,
        String phoneNumber,
        String address,
        List<String> allergies,
        long doctorId
) {
}