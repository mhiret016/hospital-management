package com.example.health.hospital_management.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AppointmentAspect {
    private final Logger logger = LoggerFactory.getLogger(AppointmentAspect.class);

    @Before("execution(* com.example.health.hospital_management.services.AppointmentService.*(..))")
    public void logBeforeServiceMethod(JoinPoint joinPoint) {
        logger.info("Executing {} with arguments {}",
                joinPoint.getSignature().getName(),
                joinPoint.getArgs());
    }

    @AfterReturning(pointcut = "execution(* com.example.health.hospital_management.services.AppointmentService.*(..))",
            returning = "result")
    public void logAfterServiceMethod(JoinPoint joinPoint, Object result) {
        logger.info("Completed {} with result {}",
                joinPoint.getSignature().getName(),
                result);
    }
}
