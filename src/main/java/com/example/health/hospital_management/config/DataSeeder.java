package com.example.health.hospital_management.config;

import com.example.health.hospital_management.entities.Doctor;
import com.example.health.hospital_management.entities.Patient;
import com.example.health.hospital_management.entities.UserCredential;
import com.example.health.hospital_management.entities.enums.BiologicalSex;
import com.example.health.hospital_management.entities.enums.HospitalRole;
import com.example.health.hospital_management.repositories.DoctorRepository;
import com.example.health.hospital_management.repositories.PatientRepository;
import com.example.health.hospital_management.repositories.UserCredentialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    private final PasswordEncoder passwordEncoder;
    private final UserCredentialRepository userCredentialRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // Only seed if database is empty
            if (userCredentialRepository.count() == 0) {
                log.info("Seeding database with initial data...");

                // Create default admin user (using lowercase email for consistency)
                UserCredential admin = UserCredential.builder()
                        .email("admin@eva-hospital.com".toLowerCase())
                        .password(passwordEncoder.encode("admin123"))
                        .role(HospitalRole.ADMIN)
                        .build();
                userCredentialRepository.save(admin);
                log.info("Created admin user: admin@eva-hospital.com / admin123");

                // Create staff user
                UserCredential staff = UserCredential.builder()
                        .email("staff@eva-hospital.com".toLowerCase())
                        .password(passwordEncoder.encode("staff123"))
                        .role(HospitalRole.STAFF)
                        .build();
                userCredentialRepository.save(staff);
                log.info("Created staff user: staff@eva-hospital.com / staff123");

                // Create patient user
                UserCredential patientUser = UserCredential.builder()
                        .email("patient@eva-hospital.com".toLowerCase())
                        .password(passwordEncoder.encode("patient123"))
                        .role(HospitalRole.PATIENT)
                        .build();
                userCredentialRepository.save(patientUser);
                log.info("Created patient user: patient@eva-hospital.com / patient123");
            }

            // Seed doctors if empty
            if (doctorRepository.count() == 0) {
                log.info("Seeding doctors...");

                Doctor doctor1 = Doctor.builder()
                        .firstName("Sarah")
                        .lastName("Johnson")
                        .department("Cardiology")
                        .specialization("Cardiologist")
                        .phone("555-0101")
                        .email("sarah.johnson@eva-hospital.com")
                        .build();

                Doctor doctor2 = Doctor.builder()
                        .firstName("Michael")
                        .lastName("Chen")
                        .department("Pediatrics")
                        .specialization("Pediatrician")
                        .phone("555-0102")
                        .email("michael.chen@eva-hospital.com")
                        .build();

                Doctor doctor3 = Doctor.builder()
                        .firstName("Emily")
                        .lastName("Rodriguez")
                        .department("Orthopedics")
                        .specialization("Orthopedic Surgeon")
                        .phone("555-0103")
                        .email("emily.rodriguez@eva-hospital.com")
                        .build();

                Doctor doctor4 = Doctor.builder()
                        .firstName("David")
                        .lastName("Patel")
                        .department("Neurology")
                        .specialization("Neurologist")
                        .phone("555-0104")
                        .email("david.patel@eva-hospital.com")
                        .build();

                Doctor doctor5 = Doctor.builder()
                        .firstName("Jennifer")
                        .lastName("Williams")
                        .department("General Medicine")
                        .specialization("General Practitioner")
                        .phone("555-0105")
                        .email("jennifer.williams@eva-hospital.com")
                        .build();

                doctorRepository.saveAll(Arrays.asList(doctor1, doctor2, doctor3, doctor4, doctor5));
                log.info("Created 5 sample doctors");

                // Seed patients if empty
                if (patientRepository.count() == 0) {
                    log.info("Seeding patients...");

                    Patient patient1 = Patient.builder()
                            .firstName("John")
                            .lastName("Doe")
                            .dateOfBirth(LocalDate.of(1985, 5, 15))
                            .biologicalSex(BiologicalSex.MALE)
                            .phoneNumber("555-1001")
                            .address("123 Main St, Springfield, IL 62701")
                            .allergies(Arrays.asList("Penicillin", "Peanuts"))
                            .primaryDoctor(doctor1)
                            .build();

                    Patient patient2 = Patient.builder()
                            .firstName("Jane")
                            .lastName("Smith")
                            .dateOfBirth(LocalDate.of(1990, 8, 22))
                            .biologicalSex(BiologicalSex.FEMALE)
                            .phoneNumber("555-1002")
                            .address("456 Oak Ave, Chicago, IL 60601")
                            .allergies(Arrays.asList("Latex"))
                            .primaryDoctor(doctor2)
                            .build();

                    Patient patient3 = Patient.builder()
                            .firstName("Robert")
                            .lastName("Brown")
                            .dateOfBirth(LocalDate.of(1978, 3, 10))
                            .biologicalSex(BiologicalSex.MALE)
                            .phoneNumber("555-1003")
                            .address("789 Elm St, Aurora, IL 60505")
                            .allergies(Arrays.asList("Aspirin"))
                            .primaryDoctor(doctor3)
                            .build();

                    Patient patient4 = Patient.builder()
                            .firstName("Maria")
                            .lastName("Garcia")
                            .dateOfBirth(LocalDate.of(1995, 11, 30))
                            .biologicalSex(BiologicalSex.FEMALE)
                            .phoneNumber("555-1004")
                            .address("321 Maple Dr, Naperville, IL 60540")
                            .allergies(Arrays.asList())
                            .primaryDoctor(doctor4)
                            .build();

                    Patient patient5 = Patient.builder()
                            .firstName("William")
                            .lastName("Taylor")
                            .dateOfBirth(LocalDate.of(1982, 7, 18))
                            .biologicalSex(BiologicalSex.MALE)
                            .phoneNumber("555-1005")
                            .address("654 Pine Rd, Joliet, IL 60431")
                            .allergies(Arrays.asList("Shellfish", "Iodine"))
                            .primaryDoctor(doctor5)
                            .build();

                    Patient patient6 = Patient.builder()
                            .firstName("Elizabeth")
                            .lastName("Martinez")
                            .dateOfBirth(LocalDate.of(1988, 2, 25))
                            .biologicalSex(BiologicalSex.FEMALE)
                            .phoneNumber("555-1006")
                            .address("987 Cedar Ln, Rockford, IL 61101")
                            .allergies(Arrays.asList("Sulfa drugs"))
                            .primaryDoctor(doctor1)
                            .build();

                    Patient patient7 = Patient.builder()
                            .firstName("James")
                            .lastName("Anderson")
                            .dateOfBirth(LocalDate.of(1970, 12, 5))
                            .biologicalSex(BiologicalSex.MALE)
                            .phoneNumber("555-1007")
                            .address("147 Birch St, Peoria, IL 61602")
                            .allergies(Arrays.asList("Codeine"))
                            .primaryDoctor(doctor2)
                            .build();

                    Patient patient8 = Patient.builder()
                            .firstName("Patricia")
                            .lastName("Lee")
                            .dateOfBirth(LocalDate.of(1993, 9, 14))
                            .biologicalSex(BiologicalSex.FEMALE)
                            .phoneNumber("555-1008")
                            .address("258 Willow Way, Champaign, IL 61820")
                            .allergies(Arrays.asList())
                            .primaryDoctor(doctor3)
                            .build();

                    patientRepository.saveAll(Arrays.asList(
                            patient1, patient2, patient3, patient4,
                            patient5, patient6, patient7, patient8
                    ));
                    log.info("Created 8 sample patients");
                }
            }

            log.info("Database seeding completed successfully!");
            log.info("========================================");
            log.info("LOGIN CREDENTIALS:");
            log.info("Admin    : admin@eva-hospital.com / admin123");
            log.info("Staff    : staff@eva-hospital.com / staff123");
            log.info("Patient  : patient@eva-hospital.com / patient123");
            log.info("========================================");
        };
    }
}
