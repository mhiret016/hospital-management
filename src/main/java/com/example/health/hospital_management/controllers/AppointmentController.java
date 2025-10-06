package com.example.health.hospital_management.controllers;

import com.example.health.hospital_management.dtos.AppointmentDTO;
import com.example.health.hospital_management.entities.Appointment;
import com.example.health.hospital_management.mappers.AppointmentMapper;
import com.example.health.hospital_management.services.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppointmentMapper appointmentMapper;

    public AppointmentController(AppointmentService appointmentService, AppointmentMapper appointmentMapper) {
        this.appointmentService = appointmentService;
        this.appointmentMapper = appointmentMapper;
    }

    @GetMapping
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentService.getAllAppointments().stream()
                .map(appointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public AppointmentDTO getAppointment(@PathVariable Long id) {
        return appointmentMapper.toDTO(appointmentService.getAppointmentById(id));
    }

    @PostMapping
    public AppointmentDTO createAppointment(@Valid @RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentMapper.toEntity(appointmentDTO);
        return appointmentMapper.toDTO(appointmentService.createAppointment(appointment));
    }

    @PutMapping("/{id}")
    public AppointmentDTO updateAppointment(@PathVariable Long id, @Valid @RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentMapper.toEntity(appointmentDTO);
        return appointmentMapper.toDTO(appointmentService.updateAppointment(id, appointment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}