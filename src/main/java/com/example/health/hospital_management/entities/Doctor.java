package com.example.health.hospital_management.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "eva_doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String specialization;
    private String department;
    private String phone;
    private String email;

    @OneToMany(mappedBy = "primaryDoctor", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Patient> patients = new ArrayList<>();
}