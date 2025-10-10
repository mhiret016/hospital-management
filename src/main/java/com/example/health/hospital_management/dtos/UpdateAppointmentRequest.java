package com.example.health.hospital_management.dtos;

import com.example.health.hospital_management.entities.enums.Status;

public record UpdateAppointmentRequest(
        long doctorId,
        Status status
) {
}