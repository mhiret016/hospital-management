package com.example.health.hospital_management.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/static")
@RequiredArgsConstructor
public class StaticController {

    @RequestMapping(value = {"/", ""}, method = RequestMethod.GET, produces = "text/html")
    public String landingPage() {
        return "landing-page"; // This will render the index.html file from src/main/resources/templates
    }
}
