package com.example.health.hospital_management.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

/**
 * Loads environment variables from .env file into Spring's environment.
 * This runs before Spring Boot starts, making .env variables available
 * to application.properties placeholders like ${JWT_SECRET}
 */
public class DotenvConfig implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        try {
            // Load .env file from project root (ignoreIfMissing = true for Docker environments)
            Dotenv dotenv = Dotenv.configure()
                    .ignoreIfMissing()  // Don't fail if .env doesn't exist (e.g., in Docker)
                    .load();

            // Convert dotenv entries to a Map for Spring
            Map<String, Object> envMap = new HashMap<>();
            dotenv.entries().forEach(entry -> {
                envMap.put(entry.getKey(), entry.getValue());
            });

            // Add to Spring Environment with high priority
            ConfigurableEnvironment environment = applicationContext.getEnvironment();
            environment.getPropertySources().addFirst(
                    new MapPropertySource("dotenvProperties", envMap)
            );

            System.out.println("✅ Loaded .env file successfully");
            System.out.println("📋 Environment variables loaded: " + envMap.keySet());

        } catch (Exception e) {
            System.out.println("⚠️  No .env file found - using system environment variables or defaults");
        }
    }
}
