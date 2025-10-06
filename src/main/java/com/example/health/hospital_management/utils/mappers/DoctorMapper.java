package com.example.health.hospital_management.utils.mappers;

import com.example.health.hospital_management.dtos.PostNewDoctorRequest;
import com.example.health.hospital_management.entities.Doctor;
import com.example.health.hospital_management.dtos.DoctorInformation;

public class DoctorMapper {

    public static DoctorInformation toDto(Doctor doctor) {
        if (doctor == null) {
            return null;
        }

        return new DoctorInformation(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialization(),
                doctor.getDepartment(),
                doctor.getPhone(),
                doctor.getEmail(),
                doctor.getPatients()
                        .stream()
                        .map(PatientMapper::toDto)
                        .toList()
        );
    }

    public static Doctor toEntity(PostNewDoctorRequest dto) {
        if (dto == null) {
            return null;
        }

        return Doctor.builder()
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .specialization(dto.specialization())
                .department(dto.department())
                .phone(dto.phone())
                .email(dto.email())
                .build();
    }
}