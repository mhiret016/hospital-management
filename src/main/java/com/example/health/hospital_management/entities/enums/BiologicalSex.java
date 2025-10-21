package com.example.health.hospital_management.entities.enums;

public enum BiologicalSex {
    MALE("Male"),
    FEMALE("Female"),
    INTERSEX("Intersex"),
    OTHER("Other");

    private final String displayName;

    BiologicalSex(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
