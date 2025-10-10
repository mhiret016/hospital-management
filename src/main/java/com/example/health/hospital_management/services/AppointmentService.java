package com.example.health.hospital_management.services;

import com.example.health.hospital_management.dtos.AppointmentInformation;
import com.example.health.hospital_management.dtos.PostNewAppointmentRequest;
import com.example.health.hospital_management.dtos.UpdateAppointmentRequest;
import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.entities.enums.HospitalRole;
import com.example.health.hospital_management.entities.enums.Status;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
public interface AppointmentService {
    AppointmentInformation createAppointment(PostNewAppointmentRequest request);
    List<AppointmentInformation> getAppointmentsById(long id, HospitalRole role);
    AppointmentInformation getAppointmentById(long id);
    AppointmentInformation updateAppointment(long id, UpdateAppointmentRequest request);
    AppointmentInformation cancelAppointment(long id);
}
