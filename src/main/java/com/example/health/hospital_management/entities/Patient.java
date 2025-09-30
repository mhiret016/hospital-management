package com.example.health.hospital_management.entities;

import com.example.health.hospital_management.entities.enums.BiologicalSex;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "eva_patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    @NotNull(message = "First name is required")
    @Size(max = 150, min = 2, message = "First name must be between 2 and 150 characters")
    private String fname;

    @Column(nullable = false, length = 150)
    @NotNull(message = "Last name is required")
    @Size(max = 150, min = 2, message = "Last name must be between 2 and 150 characters")
    private String lname;

    @Column(nullable = false)
    @NotNull(message = "Date of birth is required")
    @PastOrPresent(message = "Date of birth must be in the past or present")
    private LocalDate dateOfBirth;

    @NotNull(message = "Biological sex is required")
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BiologicalSex biologicalSex;

    @Column(nullable = false, length = 15)
    @NotNull(message = "Phone number is required")
    @Size(max = 20, min = 8, message = "Phone number must be between 8 and 20 characters")
    @Pattern(
            regexp = "^\\+?([0-9]{1,3})?[-. ]?\\(?([0-9]{1,3})\\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{4})$",
            message = "Invalid phone number format"
    )
    private String phone;

    @Column(nullable = false, length = 500)
    @NotNull(message = "Address is required")
    @Size(max = 500, min = 5, message = "Address must be between 5 and 500 characters")
    private String address;

    @ElementCollection
    @CollectionTable(
            name = "patient_allergies",
            joinColumns = @JoinColumn(name = "patient_id")
    )
    @Column(name = "allergy")
    @Builder.Default
    private List<String> allergies = new ArrayList<>();

    @ManyToOne
    private Doctor primaryDoctor;

    @OneToMany(mappedBy = "patient")
    @Builder.Default
    private List<Appointment> appointments = new ArrayList<>();
}
