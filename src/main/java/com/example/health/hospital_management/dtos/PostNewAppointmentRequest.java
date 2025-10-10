package com.example.health.hospital_management.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostNewAppointmentRequest {
    private Long patientId;
    private Long doctorId;
    private LocalDate date;
    private LocalTime time;
}