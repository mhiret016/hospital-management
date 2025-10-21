# 🏥 Hospital Management System

A full-stack hospital management application built with **Spring Boot 3.5.6**, **React 18**, and **MySQL 8.0**. This project demonstrates enterprise-level architecture with clean separation of concerns, RESTful API design, JWT authentication, and modern frontend development practices.

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen?style=flat-square&logo=spring)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security Implementation](#security-implementation)
- [Interview Preparation](#interview-preparation)
- [What I Learned](#what-i-learned)

---

## 🎯 Overview

This hospital management system provides a complete solution for managing:
- **Patients**: CRUD operations with medical history and allergies tracking
- **Doctors**: Specialization-based management with patient assignments
- **Appointments**: Scheduling system with status tracking (BOOKED, COMPLETED, CANCELLED)
- **Authentication**: JWT-based secure authentication with role-based access

### Live Demo Features
- 🔐 Secure JWT authentication
- 👨‍⚕️ Complete doctor management (Add, View, Edit, Delete)
- 👥 Patient management with medical records
- 📅 Appointment scheduling and tracking
- 🎨 Modern, responsive UI with Material-UI
- 🔄 Real-time data updates with React Query
- 🐳 Fully containerized with Docker

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 21 | Primary programming language |
| **Spring Boot** | 3.5.6 | Application framework |
| **Spring Security** | 6.5.5 | Authentication & Authorization |
| **Spring Data JPA** | - | Database abstraction layer |
| **Hibernate** | 6.x | ORM framework |
| **MySQL** | 8.0 | Relational database |
| **JWT (jjwt)** | 0.13.0 | Token-based authentication |
| **Lombok** | 1.18.30 | Boilerplate reduction |
| **Maven** | - | Build & dependency management |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18 | UI library |
| **TypeScript** | 5 | Type safety |
| **Vite** | 5 | Build tool & dev server |
| **Material-UI (MUI)** | 6 | Component library |
| **React Router** | 6 | Client-side routing |
| **React Query** | 5 | Server state management |
| **Axios** | 1.7 | HTTP client |
| **Formik** | 2.4 | Form management |
| **Yup** | 1.4 | Validation schemas |

### DevOps & Tools
- **Docker & Docker Compose**: Containerization
- **Git**: Version control
- **dotenv**: Environment variable management

---

## 🏗 Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Components  │  │  React Query │  │  Axios HTTP  │      │
│  │  (UI Layer)  │→→│  (Cache)     │→→│   Client     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────────┬────────────────────────────┘
                                 │ HTTP/REST
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND (Spring Boot)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              CONTROLLERS (REST API)                   │   │
│  │  - PatientController  - DoctorController              │   │
│  │  - AppointmentController  - AuthController            │   │
│  └─────────────────────┬────────────────────────────────┘   │
│                        │                                     │
│  ┌─────────────────────▼────────────────────────────────┐   │
│  │           SECURITY LAYER (JWT Filter)                 │   │
│  │  - JwtAuthenticationFilter                            │   │
│  │  - Validates tokens, sets SecurityContext             │   │
│  └─────────────────────┬────────────────────────────────┘   │
│                        │                                     │
│  ┌─────────────────────▼────────────────────────────────┐   │
│  │              SERVICE LAYER (Business Logic)           │   │
│  │  - PatientService  - DoctorService                    │   │
│  │  - AppointmentService  - UserService                  │   │
│  └─────────────────────┬────────────────────────────────┘   │
│                        │                                     │
│  ┌─────────────────────▼────────────────────────────────┐   │
│  │           REPOSITORY LAYER (Data Access)              │   │
│  │  - PatientRepository  - DoctorRepository              │   │
│  │  - AppointmentRepository  - UserRepository            │   │
│  └─────────────────────┬────────────────────────────────┘   │
│                        │                                     │
│  ┌─────────────────────▼────────────────────────────────┐   │
│  │                  ENTITY LAYER (Models)                │   │
│  │  - Patient  - Doctor  - Appointment  - User           │   │
│  └─────────────────────┬────────────────────────────────┘   │
└────────────────────────┼────────────────────────────────────┘
                         │ JPA/Hibernate
                         ▼
              ┌──────────────────────┐
              │   MySQL Database     │
              │  eva_hospital_db     │
              └──────────────────────┘
```

### Why This Architecture?

**Layered Architecture** provides:
- ✅ **Separation of Concerns**: Each layer has a single responsibility
- ✅ **Maintainability**: Changes in one layer don't affect others
- ✅ **Testability**: Each layer can be unit tested independently
- ✅ **Scalability**: Easy to add new features without breaking existing code

---

## ✨ Key Features

### 1. JWT Authentication System
- Stateless authentication using JSON Web Tokens
- Secure password hashing with BCrypt
- Role-based access control (ADMIN, STAFF, PATIENT)
- Token expiration (1 hour)
- Protected routes on frontend and backend

### 2. Complete CRUD Operations
- **Patients**: Create, Read, Update, Delete with full validation
- **Doctors**: Manage medical staff with specializations
- **Appointments**: Schedule and track patient-doctor meetings

### 3. Modern Frontend Architecture
- **React Query**: Automatic caching, refetching, and state management
- **Formik + Yup**: Form validation with error handling
- **Material-UI**: Professional, hospital-oriented design
- **TypeScript**: Type-safe development

### 4. Professional Backend Patterns
- **DTOs**: Separate data transfer objects from entities
- **Service Layer**: Business logic isolation
- **Exception Handling**: Global exception handler with custom exceptions
- **Validation**: Bean validation with Jakarta Validation API

### 5. DevOps Ready
- Docker containerization
- Docker Compose orchestration
- Environment-based configuration
- Health checks and restart policies

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hospital-management
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp .env.example .env

   # Frontend
   cd frontend
   cp .env.example .env
   cd ..
   ```

3. **Generate a secure JWT secret** (Optional but recommended)
   ```bash
   # Visit https://generate-random.org/api-key-generator
   # Update JWT_SECRET in .env
   ```

4. **Start the application**
   ```bash
   docker-compose up --build
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api/v1
   - MySQL: localhost:3308

### Default Login Credentials

```
Admin Account:
Email: admin@eva-hospital.com
Password: admin123

Staff Account:
Email: staff@eva-hospital.com
Password: staff123

Patient Account:
Email: patient@eva-hospital.com
Password: patient123
```

---

## 📁 Project Structure

```
hospital-management/
├── src/main/java/com/example/health/hospital_management/
│   ├── config/              # Configuration classes
│   │   ├── ApplicationConfig.java      # Beans configuration
│   │   ├── CorsConfig.java             # CORS settings
│   │   ├── DotenvConfig.java           # Environment variable loader
│   │   └── SecurityConfig.java         # Security & JWT setup
│   ├── controllers/         # REST API endpoints
│   │   ├── AuthController.java         # Login & Registration
│   │   ├── PatientController.java      # Patient CRUD
│   │   ├── DoctorController.java       # Doctor CRUD
│   │   └── AppointmentController.java  # Appointment management
│   ├── services/            # Business logic
│   │   ├── PatientService.java
│   │   ├── DoctorService.java
│   │   ├── AppointmentService.java
│   │   └── JwtService.java             # JWT generation/validation
│   ├── repositories/        # Data access layer
│   │   ├── PatientRepository.java
│   │   ├── DoctorRepository.java
│   │   ├── AppointmentRepository.java
│   │   └── UserRepository.java
│   ├── entities/            # Database models
│   │   ├── Patient.java
│   │   ├── Doctor.java
│   │   ├── Appointment.java
│   │   └── UserCredential.java
│   ├── dtos/                # Data Transfer Objects
│   │   ├── PatientInformation.java
│   │   ├── PostNewPatientRequest.java
│   │   ├── UpdatePatientRequest.java
│   │   └── ... (similar for Doctor, Appointment)
│   ├── exceptions/          # Custom exceptions
│   │   ├── PatientNotFoundException.java
│   │   ├── DoctorNotFoundException.java
│   │   └── GlobalExceptionHandler.java
│   └── utils/              # Utility classes
│       └── DataSeeder.java             # Initial data setup
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── patients/    # Patient management UI
│   │   │   ├── doctors/     # Doctor management UI
│   │   │   ├── appointments/# Appointment UI
│   │   │   └── shared/      # Reusable components
│   │   ├── static/          # Static pages
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── types/           # TypeScript types
│   │   │   └── index.ts
│   │   └── api/             # API client
│   │       └── index.ts     # Axios setup & API functions
│   └── api/                 # Root-level API exports
│       └── index.ts
│
├── docs/                    # Documentation
│   ├── ARCHITECTURE.md      # Detailed architecture guide
│   ├── API_FLOW.md          # Request/Response flow diagrams
│   └── INTERVIEW_GUIDE.md   # Interview preparation
│
├── docker-compose.yaml      # Container orchestration
├── Dockerfile               # Backend container
├── pom.xml                  # Maven dependencies
├── .env.example             # Environment template
└── README.md               # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api/v1
```

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "email": "user@example.com"
}
```

#### POST /auth/login
Authenticate and receive JWT token.

**Request:**
```json
{
  "email": "admin@eva-hospital.com",
  "password": "admin123"
}
```

**Response:** `200 OK`
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Patient Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/patient/` | Get all patients | ✅ |
| GET | `/patient/{id}` | Get patient by ID | ✅ |
| POST | `/patient/add-patient` | Create new patient | ✅ |
| PUT | `/patient/{id}` | Update patient | ✅ |
| DELETE | `/patient/{id}` | Delete patient | ✅ |

### Doctor Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/doctor/` | Get all doctors | ✅ |
| GET | `/doctor/{id}` | Get doctor with patients | ✅ |
| POST | `/doctor/` | Create new doctor | ✅ |
| PUT | `/doctor/{id}` | Update doctor | ✅ |
| DELETE | `/doctor/{id}` | Delete doctor | ✅ |

### Appointment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/appointment/` | Get all appointments | ✅ |
| GET | `/appointment/{id}` | Get appointment by ID | ✅ |
| POST | `/appointment/` | Schedule appointment | ✅ |
| PUT | `/appointment/{id}` | Update appointment | ✅ |
| DELETE | `/appointment/{id}` | Cancel appointment | ✅ |

For detailed request/response examples, see [API_FLOW.md](docs/API_FLOW.md)

---

## 🔐 Security Implementation

### Environment Variables
Sensitive data is never hardcoded. All secrets are managed via environment variables:

```env
JWT_SECRET=<your-secure-random-secret>
DB_PASSWORD=<database-password>
```

### JWT Authentication Flow
1. User logs in with credentials
2. Backend validates credentials
3. Backend generates JWT token with user info
4. Frontend stores token in localStorage
5. All subsequent requests include token in Authorization header
6. Backend validates token on each request

### Security Features
- ✅ Password hashing with BCrypt
- ✅ JWT token-based authentication
- ✅ CORS configuration for cross-origin requests
- ✅ Role-based access control
- ✅ Environment variable management
- ✅ SQL injection prevention (JPA parameterized queries)

For setup instructions, see [SECURITY_SETUP.md](docs/SECURITY_SETUP.md)

---

## 🎤 Interview Preparation

### Common Interview Questions & Answers

**See the comprehensive interview guide:** [INTERVIEW_GUIDE.md](docs/INTERVIEW_GUIDE.md)

This guide covers:
- ✅ Architecture decisions and justifications
- ✅ Technology choice rationale
- ✅ Request/Response flow explanations
- ✅ Security implementation details
- ✅ Database design decisions
- ✅ Frontend state management
- ✅ Common pitfalls and solutions

---

## 📚 What I Learned

### Backend
- ✅ **Spring Boot**: Dependency injection, auto-configuration
- ✅ **Spring Security**: JWT implementation, security filters
- ✅ **Spring Data JPA**: Repository pattern, query methods
- ✅ **RESTful API Design**: Resource naming, HTTP methods, status codes
- ✅ **Exception Handling**: Global exception handler, custom exceptions
- ✅ **DTO Pattern**: Separating internal models from API contracts

### Frontend
- ✅ **React Query**: Server state management, caching strategies
- ✅ **TypeScript**: Type safety in large applications
- ✅ **Form Management**: Formik + Yup for complex forms
- ✅ **Material-UI**: Component customization and theming
- ✅ **Axios Interceptors**: Global request/response handling

### DevOps
- ✅ **Docker**: Multi-container applications
- ✅ **Docker Compose**: Service orchestration
- ✅ **Environment Management**: Development vs production configs

### Software Engineering
- ✅ **Layered Architecture**: Separation of concerns
- ✅ **SOLID Principles**: Single responsibility, dependency inversion
- ✅ **Clean Code**: Meaningful names, small functions
- ✅ **Version Control**: Git workflow, .gitignore best practices

---

## 🤝 Contributing

This is a portfolio/learning project. Feel free to fork and modify for your own learning!

---

## 📄 License

This project is open source and available for educational purposes.

---

## 📞 Contact

**Your Name**
- Portfolio: [your-portfolio.com]
- LinkedIn: [your-linkedin]
- GitHub: [your-github]
- Email: [your-email]

---

## 🙏 Acknowledgments

Built as a learning project to demonstrate full-stack Java development skills for mid-level developer positions.

---

**⭐ If this project helped you learn, please give it a star!**
