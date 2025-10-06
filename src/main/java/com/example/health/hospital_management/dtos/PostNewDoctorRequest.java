package com.example.health.hospital_management.dtos;

public record PostNewDoctorRequest(
        String firstName,
        String lastName,
        String specialization,
        String department,
        String phone,
        String email){
}
