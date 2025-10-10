package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.DoctorInformation;
import com.example.health.hospital_management.dtos.PostNewDoctorRequest;
import com.example.health.hospital_management.dtos.UpdateDoctorRequest;
import com.example.health.hospital_management.entities.Doctor;
import com.example.health.hospital_management.exceptions.DoctorNotFoundException;
import com.example.health.hospital_management.repositories.DoctorRepository;
import com.example.health.hospital_management.services.DoctorService;
import com.example.health.hospital_management.utils.mappers.DoctorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final DoctorRepository doctorRepository;

    @Override
    public List<DoctorInformation> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(DoctorMapper::toDto)
                .toList();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return null;
    }

    @Override
    public Doctor getDoctorEntityById(Long id) {
        return null;
    }

    @Override
    public DoctorInformation getDoctorById(long id) {
        return DoctorMapper.toDto(doctorRepository.findById(id)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor with the id " + id + " not found!")));
    }

    @Override
    public List<DoctorInformation> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findAllBySpecializationIgnoreCase(specialization)
                .stream()
                .map(DoctorMapper::toDto)
                .toList();
    }

    @Override
    public DoctorInformation createDoctor(PostNewDoctorRequest request) {
        Doctor doctor = DoctorMapper.toEntity(request);
        return DoctorMapper.toDto(doctorRepository.save(doctor));
    }

    @Override
    public DoctorInformation updateDoctor(Long id, UpdateDoctorRequest request) {
        return null;
    }

    @Override
    public void deleteDoctor(Long id) {

    }

    @Override
    public DoctorInformation updateDoctor(long id, UpdateDoctorRequest request) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor with the id " + id + " not found!"));
        doctor.setFirstName(request.firstName());
        doctor.setLastName(request.lastName());
        doctor.setPhone(request.phone());
        doctor.setDepartment(request.department());
        doctor.setSpecialization(request.specialization());
        return DoctorMapper.toDto(doctorRepository.save(doctor));
    }

    @Override
    public void deleteDoctorById(long id) {
        if(!doctorRepository.existsById(id)){
            throw new DoctorNotFoundException("Doctor with the id " + id + " not found!");
        }
        doctorRepository.deleteById(id);
    }
}