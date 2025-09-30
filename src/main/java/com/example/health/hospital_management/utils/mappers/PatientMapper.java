package com.example.health.hospital_management.utils.mappers;

import com.example.health.hospital_management.dto.PatientInformation;
import com.example.health.hospital_management.dto.PostNewPatientRequest;
import com.example.health.hospital_management.entities.Patient;
import com.example.health.hospital_management.entities.enums.BiologicalSex;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class PatientMapper {

    public static Patient toEntity(PostNewPatientRequest request) {
        return Patient.builder()
                .fname(request.firstName())
                .lname(request.lastName())
                .dateOfBirth(LocalDate.parse(request.dateOfBirth()))
                .biologicalSex(BiologicalSex.valueOf(request.biologicalSex()))
                .phone(request.phone())
                .address(request.address())
                .allergies(
                        Optional.ofNullable(request.allergies())
                                .map(allergyStr -> List.of(allergyStr.split(",")))
                                .orElse(List.of())
                )
                .build();
    }

    public static PatientInformation toDto(Patient patient) {
        return new PatientInformation(
                patient.getId(),
                patient.getFname(),
                patient.getLname(),
                patient.getDateOfBirth().toString(),
                patient.getBiologicalSex().name(),
                patient.getPhone(),
                patient.getAddress(),
                String.join(",", patient.getAllergies())
        );
    }
}
