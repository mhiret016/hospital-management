package com.example.health.hospital_management.repositories;

import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.entities.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Find appointments by patient
    List<Appointment> findByPatientId(Long patientId);

    // Find appointments by doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // Find appointments by date range
    List<Appointment> findByDateBetweenOrderByDateAscTimeAsc(LocalDate startDate, LocalDate endDate);

    // Find appointments by status
    List<Appointment> findByStatus(Status status);

    // Find upcoming appointments for a doctor
    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.date >= :date")
    List<Appointment> findUpcomingAppointmentsByDoctor(@Param("doctorId") Long doctorId, @Param("date") LocalDate date);

    // Find appointments by date and doctor
    List<Appointment> findByDateAndDoctorIdOrderByTimeAsc(LocalDate date, Long doctorId);

    // Count appointments by status
    long countByStatus(Status status);

    // Check for time slot conflicts
    boolean existsByDoctorIdAndDateAndTime(Long doctorId, LocalDate date, LocalTime time);
}
