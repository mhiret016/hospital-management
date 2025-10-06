package com.example.health.hospital_management.dtos;

import lombok.Data;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public record AppointmentDTO() {
    private static Long id;

    @NotNull(message = "Patient ID is required")
    private static Long patientId;

    @NotNull(message = "Doctor ID is required")
    private static Long doctorId;

    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Appointment date must be today or in the future")
    private static LocalDate date;

    @NotNull(message = "Time is required")
    private static LocalTime time;

    private static String status;
}
