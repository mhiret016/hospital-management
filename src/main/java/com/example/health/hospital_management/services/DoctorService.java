package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.DoctorInformation;
import com.example.health.hospital_management.dtos.PostNewDoctorRequest;
import com.example.health.hospital_management.dtos.UpdateDoctorRequest;
import com.example.health.hospital_management.entities.Doctor;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DoctorService {
    List<DoctorInformation> getAllDoctors();
    DoctorInformation getDoctorById(long id);
    List<DoctorInformation> getDoctorsBySpecialization(String specialization);
    DoctorInformation createDoctor(PostNewDoctorRequest request);
    DoctorInformation updateDoctor(long id, UpdateDoctorRequest request);
    void deleteDoctorById(long id);
}