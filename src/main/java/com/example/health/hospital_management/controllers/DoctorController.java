package com.example.health.hospital_management.controllers;

import com.example.health.hospital_management.dtos.DoctorInformation;
import com.example.health.hospital_management.dtos.PostNewDoctorRequest;
import com.example.health.hospital_management.dtos.UpdateDoctorRequest;
import com.example.health.hospital_management.services.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/doctor")
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping("/")
    public ResponseEntity<List<DoctorInformation>> getAllDoctors() {
        return new ResponseEntity<>(doctorService.getAllDoctors(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorInformation> getDoctorById(@PathVariable long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @PostMapping("/")
    public ResponseEntity<DoctorInformation> postNewDoctor(@RequestBody PostNewDoctorRequest request) {
        DoctorInformation createdDoctor = doctorService.createDoctor(request);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdDoctor.id())
                .toUri();
        return ResponseEntity.created(location).body(createdDoctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorInformation> updateDoctor(
            @PathVariable long id,
            @RequestBody UpdateDoctorRequest request
    ) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable long id) {
        doctorService.deleteDoctorById(id);
        return ResponseEntity.noContent().build();
    }
}