package com.example.health.hospital_management.services;

import com.example.health.hospital_management.entities.Doctor;

import java.util.List;

public interface DoctorService {
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(Long id);
    Doctor createDoctor(Doctor doctor);
    Doctor updateDoctor(Long id, Doctor doctor);
    void deleteDoctor(Long id);
    List<Doctor> searchDoctors(String name);
    List<Doctor> findBySpecialization(String specialization);
}
