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
    @NotNull(message = "Patient is required") Patient getPatientById(long id);
    PatientInformation updatePatient(long id, PostNewPatientRequest request);
    void deletePatient(long id);
    List<PatientInformation> searchPatients(String name, LocalDate dateOfBirth, String biologicalSex);
    Patient getPatientEntityById(long id);

}
