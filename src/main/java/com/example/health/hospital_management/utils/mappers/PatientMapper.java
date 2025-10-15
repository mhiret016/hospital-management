package com.example.health.hospital_management.utils.mappers;

import com.example.health.hospital_management.dtos.PatientInformation;
import com.example.health.hospital_management.dtos.PostNewPatientRequest;
import com.example.health.hospital_management.entities.Patient;
import com.example.health.hospital_management.entities.enums.BiologicalSex;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class PatientMapper {
    public static Patient toEntity(PostNewPatientRequest request) {
        return new Patient(
                0L,
                request.firstName(),
                request.lastName(),
                request.dateOfBirth(),
                BiologicalSex.valueOf(request.biologicalSex().toUpperCase()),
                request.phone(),
                request.address(),
                Arrays.asList(request.allergies().split(",")),
                null, null
        );
    }

    public static PatientInformation toDto(Patient patient) {
        return new PatientInformation(
                patient.getId(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getPhoneNumber(),
                patient.getAddress(),
                patient.getDateOfBirth(),
                patient.getBiologicalSex(),
                patient.getAllergies()
        );
    }

    public static Patient toEntity(PatientInformation patientInformation) {
        return new Patient(
                patientInformation.id(),
                patientInformation.firstName(),
                patientInformation.lastName(),
                patientInformation.dateOfBirth(),
                patientInformation.biologicalSex(),
                patientInformation.phoneNumber(),
                patientInformation.address(),
                patientInformation.allergies(),
                null, null
        );
    }
}