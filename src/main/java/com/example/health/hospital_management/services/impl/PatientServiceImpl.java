package com.example.health.hospital_management.services.impl;

import com.example.health.hospital_management.dto.PatientInformation;
import com.example.health.hospital_management.dto.PostNewPatientRequest;
import com.example.health.hospital_management.entities.Patient;
import com.example.health.hospital_management.entities.enums.BiologicalSex;
import com.example.health.hospital_management.exceptions.PatientNotFoundException;
import com.example.health.hospital_management.repositories.PatientRepository;
import com.example.health.hospital_management.services.PatientService;
import com.example.health.hospital_management.exceptions.ResourceNotFoundException;
import com.example.health.hospital_management.utils.mappers.PatientMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Primary
public class PatientServiceImpl implements PatientService {
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
    public PatientInformation getPatientById(long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient with id " + id + " not found"));
        return PatientMapper.toDto(patient);
    }

    @Override
    public PatientInformation updatePatient(long id, PostNewPatientRequest request) {
        return null;
    }

    @Override
    public void deletePatient(long id) {

    }

    @Override
        public List<PatientInformation> searchPatients(String name, LocalDate dob, String biologicalSex) {
            return patientRepository.findAll().stream()
                    .filter(patient -> (name == null || patient.getFname().contains(name) || patient.getLname().contains(name)) &&
                                     (dob == null || patient.getDateOfBirth().equals(dob)) &&
                                     (biologicalSex == null || patient.getBiologicalSex().toString().equalsIgnoreCase(biologicalSex)))
                    .map(PatientMapper::toDto)
                    .toList();
        }

    @Override
    public Patient getPatientEntityById(long id) {
        return null;
    }
}
