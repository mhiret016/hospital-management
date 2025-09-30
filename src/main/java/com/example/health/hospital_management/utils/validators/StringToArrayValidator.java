package com.example.health.hospital_management.utils.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StringToArrayValidator implements ConstraintValidator<StringToArray, String> {
    private String delimiter;

    @Override
    public void initialize(StringToArray constraintAnnotation) {
        this.delimiter = constraintAnnotation.delimiter();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        boolean isValid = true;
        if(value==null || value.trim().isEmpty()){
            return true;
        }
        if (!value.isEmpty()) {
            String[] items = value.split(delimiter);
            if (items.length == 0) {
                isValid = false;
            }
            return isValid; // Consider null or empty as valid. Use @NotNull or @NotEmpty for null/empty checks.
        }
        return isValid;
    }
}
