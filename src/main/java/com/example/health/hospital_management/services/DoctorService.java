package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.DoctorInformation;
import com.example.health.hospital_management.dtos.PostNewDoctorRequest;
import com.example.health.hospital_management.dtos.UpdateDoctorRequest;
import com.example.health.hospital_management.entities.Doctor;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public interface DoctorService {
    List<DoctorInformation> getAllDoctors();
    @NotNull(message = "Doctor is required")

    Doctor getDoctorById(Long id);

    Doctor getDoctorEntityById(Long id);
    List<DoctorInformation> getDoctorsBySpecialization(String specialization);
    DoctorInformation createDoctor(PostNewDoctorRequest request);
    DoctorInformation updateDoctor(Long id, UpdateDoctorRequest request);
    void deleteDoctor(Long id);
}