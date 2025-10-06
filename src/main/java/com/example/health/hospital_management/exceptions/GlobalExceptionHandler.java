package com.example.health.hospital_management.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import com.example.health.hospital_management.exceptions.PatientNotFoundException;
import com.example.health.hospital_management.exceptions.DoctorNotFoundException;
import com.example.health.hospital_management.exceptions.ResourceNotFoundException;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {PatientNotFoundException.class, DoctorNotFoundException.class, ResourceNotFoundException.class})
    public ModelAndView exceptionHandler(RuntimeException exception, HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("error/404");
        mav.addObject("errorMessage", exception.getMessage());
        mav.addObject("requestUrl", request.getRequestURL().toString());
        mav.addObject("timestamp", LocalDateTime.now());
        mav.setStatus(HttpStatus.NOT_FOUND);
        return mav;
    }
}