package com.example.health.hospital_management.services.impl;

import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.entities.enums.Status;
import com.example.health.hospital_management.exceptions.ResourceNotFoundException;
import com.example.health.hospital_management.repositories.AppointmentRepository;
import com.example.health.hospital_management.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment existingAppointment = getAppointmentById(id);
        appointment.setId(existingAppointment.getId());
        return appointmentRepository.save(appointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<Appointment> findByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> findByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> findByDateRange(LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.findByDateBetweenOrderByDateAscTimeAsc(startDate, endDate);
    }

    @Override
    public List<Appointment> findByStatus(Status status) {
        return appointmentRepository.findByStatus(status);
    }

    @Override
    public boolean isTimeSlotAvailable(Long doctorId, LocalDate date, LocalTime time) {
        return !appointmentRepository.existsByDoctorIdAndDateAndTime(doctorId, date, time);
    }
}
