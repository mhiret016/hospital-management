package com.example.health.hospital_management.entities;

import com.example.health.hospital_management.entities.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
@Entity
@Data
@Table(name = "eva_appointments")
@AllArgsConstructor
@NoArgsConstructor
public class Appointment extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "patientId", nullable = false)
    @NotNull(message = "Patient is required")
    private Patient patient;

    @ManyToOne(optional = false)
    @JoinColumn(name = "doctorId", nullable = false)
    @NotNull(message = "Doctor is required")
    private Doctor doctor;

    @Column(nullable = false)
    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Appointment date must be today or in the future")
    private LocalDate date;

    @Column(nullable = false)
    @NotNull(message = "Time is required")
    private LocalTime time;

    @Column(nullable = false)
    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private Status status;
}