package com.example.health.hospital_management.entities.enums;

public enum Status {
    BOOKED("Booked"),
    COMPLETED("Completed"),
    CANCELLED("Cancelled");
    private final String displayName;

    Status(String displayName) {this.displayName = displayName;}
    public  String getDisplayName() {return displayName;}
}
