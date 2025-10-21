package com.example.health.hospital_management.controllers;

import com.example.health.hospital_management.dtos.AppointmentInformation;
import com.example.health.hospital_management.dtos.PostNewAppointmentRequest;
import com.example.health.hospital_management.dtos.UpdateAppointmentRequest;
import com.example.health.hospital_management.entities.enums.HospitalRole;
import com.example.health.hospital_management.services.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointment")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/")
    public ResponseEntity<AppointmentInformation> createAppointment(
            @RequestBody @Valid PostNewAppointmentRequest request) {
        return ResponseEntity.status(201).body(appointmentService.createAppointment(request));
    }

    @GetMapping("/")
    public ResponseEntity<List<AppointmentInformation>> getAppointments(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) HospitalRole role) {
        if (id != null && role != null) {
            return ResponseEntity.ok(appointmentService.getAppointmentsById(id, role));
        }
        // If no parameters provided, return all appointments
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentInformation> getAppointmentById(@PathVariable long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentInformation> updateAppointment(
            @PathVariable long id,
            @RequestBody @Valid UpdateAppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AppointmentInformation> cancelAppointment(@PathVariable long id) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(id));
    }
}
