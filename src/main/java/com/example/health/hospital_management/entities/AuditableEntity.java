package com.example.health.hospital_management.entities;

import jakarta.persistence.MappedSuperclass;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.time.LocalDateTime;

@MappedSuperclass
public class AuditableEntity {
    //Common auditing fields like createdAt, updatedAt, createdBy, updatedBy can be added here
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
