package com.example.health.hospital_management.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode
@Entity
@Table(name = "eva_doctors")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 150)
    @NotNull(message = "First name is required")
    @Size(max = 150, min = 2, message = "First name must be between 2 and 150 characters")
    private String firstName;

    @Column(nullable = false, length = 150)
    @NotNull(message = "Last name is required")
    @Size(max = 150, min = 2, message = "First name must be between 2 and 150 characters")
    private String lastName;

    @Column(nullable = false, length = 150)
    @NotNull(message = "Specialization is required")
    @Size(max = 150, min = 2, message = "Specialization must be between 2 and 150 characters")
    private String specialization;

    @Column(nullable = false, length = 15)
    @NotNull(message = "Phone number is required")
    @Size(max = 20, min = 8, message = "Phone number must be between 8 and 20 characters")
    @Pattern(regexp = "^\\+?([0-9]{1,3})?[-. ]?\\(?([0-9]{1,3})\\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{4})$", message = "Invalid phone number format")
    private String phone;

    @Column(nullable = false, length = 150)
    @NotNull(message = "Email is required")
    @Size(max = 150, min = 5, message = "Email must be between 5 and 150 characters")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;

    @OneToMany(mappedBy = "primaryDoctor", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Patient> primaryPatients;

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;
}