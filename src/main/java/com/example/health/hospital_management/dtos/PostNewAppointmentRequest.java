package com.example.health.hospital_management.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public record PostNewAppointmentRequest(
        long patientId,
        long doctorId,
        LocalDate date,
        LocalTime time
) {
}