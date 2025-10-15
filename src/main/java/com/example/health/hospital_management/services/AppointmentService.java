package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.AppointmentInformation;
import com.example.health.hospital_management.dtos.PostNewAppointmentRequest;
import com.example.health.hospital_management.dtos.UpdateAppointmentRequest;
import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.entities.enums.HospitalRole;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AppointmentService {
    AppointmentInformation createAppointment(PostNewAppointmentRequest request);
    List<AppointmentInformation> getAppointmentsById(long id, HospitalRole role);
    AppointmentInformation getAppointmentById(long id);
    AppointmentInformation updateAppointment(long id, UpdateAppointmentRequest request);
    AppointmentInformation cancelAppointment(long id);
}
