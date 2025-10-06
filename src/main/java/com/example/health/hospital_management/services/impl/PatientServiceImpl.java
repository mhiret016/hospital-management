package com.example.health.hospital_management.services.impl;

import com.example.health.hospital_management.dtos.PatientInformation;
import com.example.health.hospital_management.dtos.PostNewPatientRequest;
import com.example.health.hospital_management.entities.Patient;
import com.example.health.hospital_management.exceptions.PatientNotFoundException;
import com.example.health.hospital_management.repositories.PatientRepository;
import com.example.health.hospital_management.services.PatientService;
import com.example.health.hospital_management.utils.mappers.PatientMapper;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Primary
public class PatientServiceImpl implements PatientService{
    private final PatientRepository patientRepository;

    @Override
    public PatientInformation createPatient(PostNewPatientRequest request) {
        Patient newPatient = PatientMapper.toEntity(request);
        newPatient = patientRepository.save(newPatient);
        return PatientMapper.toDto(newPatient);
    }

    @Override
    public List<PatientInformation> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(PatientMapper::toDto)
                .toList();
    }

    @Override
    public @NotNull(message = "Patient is required") Patient getPatientById(long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient with id " + id + " not found"));
    }

    @Override
    public PatientInformation updatePatient(long id, PostNewPatientRequest request) {
        return null;
    }

    @Override
    public void deletePatient(long id) {

    }

    @Override
    public List<PatientInformation> searchPatients(String name, LocalDate dateOfBirth, String biologicalSex) {
        return null;
    }

    @Override
    public Patient getPatientEntityById(long id) {
        return null;
    }
}