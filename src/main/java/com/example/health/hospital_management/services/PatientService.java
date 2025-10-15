package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.PatientInformation;
import com.example.health.hospital_management.dtos.PostNewPatientRequest;
import com.example.health.hospital_management.dtos.UpdatePatientRequest;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public interface PatientService {
    PatientInformation createPatient(PostNewPatientRequest request);
    List<PatientInformation> getAllPatients();
    PatientInformation getPatientById(long id);
    void deletePatientById(long id);
    PatientInformation updatePatient(long id, UpdatePatientRequest request);
}