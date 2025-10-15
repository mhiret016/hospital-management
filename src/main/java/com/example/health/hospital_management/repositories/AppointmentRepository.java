package com.example.health.hospital_management.repositories;

import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.entities.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    List<Appointment> findAllByStatusOrderByDateAsc(Status status);
    List<Appointment> findAllByPatientId(long id);
    List<Appointment> findAllByDoctorId(long id);

}