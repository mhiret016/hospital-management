package com.example.health.hospital_management.utils.mappers;

import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.dtos.AppointmentInformation;

public class AppointmentMapper {
    public static AppointmentInformation toDto(Appointment appointment) {
        return new AppointmentInformation(
                appointment.getId(),
                PatientMapper.toDto(appointment.getPatient()),
                DoctorMapper.toDto(appointment.getDoctor()),
                appointment.getDate(),
                appointment.getTime(),
                appointment.getStatus()
        );
    }
}