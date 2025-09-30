package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dto.PatientInformation;
import com.example.health.hospital_management.dto.PostNewPatientRequest;
import com.example.health.hospital_management.entities.Patient;

import java.time.LocalDate;
import java.util.List;

public interface PatientService {
    PatientInformation createPatient(PostNewPatientRequest request);
    List<PatientInformation> getAllPatients();
    PatientInformation getPatientById(long id);
    PatientInformation updatePatient(long id, PostNewPatientRequest request);
    void deletePatient(long id);
    List<PatientInformation> searchPatients(String name, LocalDate dateOfBirth, String biologicalSex);
    Patient getPatientEntityById(long id);

}
