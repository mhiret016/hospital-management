package com.example.health.hospital_management.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "eva_doctors")
@Getter
@Setter
@ToString(exclude = "patients")
@EqualsAndHashCode(exclude = "patients")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "primaryDoctor", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Patient> patients = new ArrayList<>();
}