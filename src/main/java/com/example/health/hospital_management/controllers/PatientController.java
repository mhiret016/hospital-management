package com.example.health.hospital_management.controllers;

import com.example.health.hospital_management.dtos.PostNewPatientRequest;
import jakarta.validation.Valid;
import org.springframework.ui.Model;
import com.example.health.hospital_management.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @GetMapping("/patients")
    public String getPatients(Model model) {
        model.addAttribute("patients", patientService.getAllPatients());
        return "patients/index"; // returns the view name
    }
    @GetMapping("/add-patient")
    public String postNewPatient(Model model) {
        model.addAttribute("newPatient", new PostNewPatientRequest());
        return "patients/add";
    }

    @PostMapping("add-patient")
    public String postNewPatient(@ModelAttribute("newPatient") @Valid PostNewPatientRequest request, Errors errors) {
        if(errors.hasErrors()) return "patients/add";
        patientService.createPatient(request);
        return "redirect:/patients";
    }
}
