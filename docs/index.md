# Hospital Management System Documentation

Welcome to the Hospital Management System documentation. This comprehensive guide covers all aspects of the system, from architecture to maintenance.

## Table of Contents

1. [System Architecture](architecture.md)
2. [Core Features](features.md)
3. [API Documentation](api.md)
4. [Axios Implementation](axios-implementation.md)
5. [Interview Walkthrough - Role-Based Dashboards](interview-walkthrough.md)
6. [Database Schema](database.md)
7. [Setup Guide](setup.md)
8. [Maintenance](maintenance.md)

## System Overview

The Hospital Management System is a comprehensive software solution designed to streamline and automate hospital operations, patient management, and administrative tasks.

### Key Components

- Patient Management System
- Appointment Scheduling
- Medical Records Management
- Staff Management
- Inventory Control
- Billing System
- Laboratory Management
- Pharmacy Management

### Technical Stack

- Backend: Spring Boot (Java)
- Frontend: React + TypeScript + Vite
- UI Framework: Material-UI (MUI)
- Database: PostgreSQL
- Authentication: JWT with Role-Based Access Control (RBAC)
- HTTP Client: Axios (with request/response interceptors)
- State Management: React Query (TanStack Query)

### User Roles

The system supports three distinct user roles with separate dashboards:

1. **ADMIN** - Full system access with administrative capabilities
2. **STAFF** - Doctor/medical staff access for appointment and patient management
3. **PATIENT** - Patient portal for viewing appointments and personal information
