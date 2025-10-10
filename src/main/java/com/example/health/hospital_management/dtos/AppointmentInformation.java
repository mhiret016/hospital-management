package com.example.health.hospital_management.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentInformation(
        long id,
        PatientInformation patient,
        DoctorInformation doctor,
        LocalDate date,
        LocalTime time,
        com.example.health.hospital_management.entities.enums.@jakarta.validation.constraints.NotNull(message = "Status is required") Status status
) {
}