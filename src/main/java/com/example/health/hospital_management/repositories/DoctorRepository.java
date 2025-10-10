package com.example.health.hospital_management.repositories;

import com.example.health.hospital_management.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findAllBySpecializationIgnoreCase(String specialization);

    List<Doctor> findAllByDepartmentIgnoreCaseOrderByLastNameAsc(String department);

    @Query("""
      SELECT d FROM Doctor d
      WHERE (:dept IS NULL OR :dept = '' OR LOWER(d.department) = LOWER(:dept))
        AND (:name IS NULL OR :name = '' OR
             LOWER(d.lastName)  LIKE LOWER(CONCAT('%', :name, '%')))
            ORDER BY d.lastName ASC
    """)
    List<Doctor> search(@Param("dept") String dept, @Param("name") String name );
}