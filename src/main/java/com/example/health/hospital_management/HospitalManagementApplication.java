package com.example.health.hospital_management;

import com.example.health.hospital_management.entities.Doctor;
import com.example.health.hospital_management.entities.Patient;
import com.example.health.hospital_management.entities.enums.BiologicalSex;
import com.example.health.hospital_management.repositories.DoctorRepository;
import com.example.health.hospital_management.repositories.PatientRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class HospitalManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(HospitalManagementApplication.class, args);
    }

    // NOTE: Old seeding logic removed - now using DataSeeder.java for database initialization
    // DataSeeder provides:
    // - 3 user accounts (admin, staff, patient) for authentication
    // - 5 sample doctors
    // - 8 sample patients with proper relationships
}