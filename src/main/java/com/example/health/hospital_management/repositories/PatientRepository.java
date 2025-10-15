package com.example.health.hospital_management.repositories;

import com.example.health.hospital_management.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Corrected field name for sorting
    List<Patient> findAllByDateOfBirthOrderByLastNameAsc(LocalDate dateOfBirth);

    // Corrected JPQL query for searching
    @Query("""
           SELECT p FROM Patient p
           WHERE LOWER(p.lastName) LIKE LOWER(CONCAT('%', ?1, '%'))
              OR LOWER(p.firstName) LIKE LOWER(CONCAT('%', ?1, '%'))
           """)
    List<Patient> searchByName(String name);
}