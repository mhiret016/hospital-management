package com.example.health.hospital_management.dtos;

import com.example.health.hospital_management.entities.enums.BiologicalSex;

import java.time.LocalDate;
import java.util.List;

public record PatientInformation(
        long id,
        String firstName,
        String lastName,
        String phoneNumber,
        String address,
        LocalDate dateOfBirth,
        BiologicalSex biologicalSex,
        List<String> allergies
) { }