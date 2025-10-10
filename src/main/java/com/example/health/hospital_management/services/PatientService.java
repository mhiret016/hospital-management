package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.PatientInformation;
import com.example.health.hospital_management.dtos.PostNewPatientRequest;
import com.example.health.hospital_management.entities.Patient;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public interface PatientService {
    PatientInformation createPatient(PostNewPatientRequest request);
    List<PatientInformation> getAllPatients();
    PatientInformation getPatientById(long id);
    void deletePatientById(long id);
}