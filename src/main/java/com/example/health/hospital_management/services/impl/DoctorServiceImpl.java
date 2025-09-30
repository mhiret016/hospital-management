package com.example.health.hospital_management.services.impl;

import com.example.health.hospital_management.entities.Doctor;
import com.example.health.hospital_management.exceptions.ResourceNotFoundException;
import com.example.health.hospital_management.repositories.DoctorRepository;
import com.example.health.hospital_management.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));
    }

    @Override
    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor existingDoctor = getDoctorById(id);
        existingDoctor.setFirstName(doctor.getFirstName());
        existingDoctor.setLastName(doctor.getLastName());
        existingDoctor.setSpecialization(doctor.getSpecialization());
        existingDoctor.setPhone(doctor.getPhone());
        existingDoctor.setEmail(doctor.getEmail());
        return doctorRepository.save(existingDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {
        Doctor doctor = getDoctorById(id);
        doctorRepository.delete(doctor);
    }

    @Override
    public List<Doctor> searchDoctors(String name) {
        return doctorRepository.searchByName(name);
    }

    @Override
    public List<Doctor> findBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }
}