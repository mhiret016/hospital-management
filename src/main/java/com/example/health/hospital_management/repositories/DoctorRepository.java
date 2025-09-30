package com.example.health.hospital_management.repositories;

import com.example.health.hospital_management.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("SELECT d FROM Doctor d WHERE d.lastName LIKE %:name% OR d.firstName LIKE %:name%")
    List<Doctor> searchByName(@Param("name") String name);

    List<Doctor> findBySpecialization(String specialization);

    List<Doctor> findAllByOrderByLastNameAsc();

    long countBySpecialization(String specialization);
}