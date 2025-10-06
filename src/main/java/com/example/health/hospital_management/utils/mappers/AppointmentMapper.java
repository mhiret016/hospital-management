package com.example.health.hospital_management.mappers;

import com.example.health.hospital_management.dtos.AppointmentDTO;
import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.entities.enums.Status;
import com.example.health.hospital_management.services.DoctorService;
import com.example.health.hospital_management.services.PatientService;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {
    private final DoctorService doctorService;
    private final PatientService patientService;

    public AppointmentMapper(DoctorService doctorService, PatientService patientService) {
        this.doctorService = doctorService;
        this.patientService = patientService;
    }

    public Appointment toEntity(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        appointment.setId(dto.getId());
        appointment.setPatient(patientService.getPatientById(dto.getPatientId()));
        appointment.setDoctor(doctorService.getDoctorById(dto.getDoctorId()));
        appointment.setDate(dto.getDate());
        appointment.setTime(dto.getTime());
        appointment.setStatus(Status.valueOf(dto.getStatus()));
        return appointment;
    }

    public AppointmentDTO toDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setPatientId(appointment.getPatient().getId());
        dto.setDoctorId(appointment.getDoctor().getId());
        dto.setDate(appointment.getDate());
        dto.setTime(appointment.getTime());
        dto.setStatus(appointment.getStatus().name());
        return dto;
    }
}