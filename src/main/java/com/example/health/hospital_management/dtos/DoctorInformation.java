package com.example.health.hospital_management.dtos;

import lombok.Data;

import java.util.List;

@Data
public record DoctorInformation(
        long id,
        String firstName,
        String lastName,
        String specialization,
        String department,
        String phone,
        String email,
        List<PatientInformation> patients
) {
    public DoctorInformation(
            long id,
            String firstName,
            String lastName,
            String specialization,
            String department,
            String phone,
            String email
    ) {
        this(id, firstName, lastName, specialization, department, phone, email, null);
    }
}