package com.example.health.hospital_management.dtos;

import lombok.Data;

@Data
public record PostNewDoctorRequest(
        String firstName,
        String lastName,
        String specialization,
        String department,
        String phone,
        String email){
}
