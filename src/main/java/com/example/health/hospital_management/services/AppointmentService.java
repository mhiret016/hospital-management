package com.example.health.hospital_management.services;

import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.entities.enums.Status;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentService {
    List<Appointment> getAllAppointments();
    Appointment getAppointmentById(Long id);
    Appointment createAppointment(Appointment appointment);
    Appointment updateAppointment(Long id, Appointment appointment);
    void deleteAppointment(Long id);
    List<Appointment> findByPatient(Long patientId);
    List<Appointment> findByDoctor(Long doctorId);
    List<Appointment> findByDateRange(LocalDate startDate, LocalDate endDate);
    List<Appointment> findByStatus(Status status);
    boolean isTimeSlotAvailable(Long doctorId, LocalDate date, LocalTime time);
}
