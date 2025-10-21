# Core Features

## Authentication & Authorization

### Role-Based Access Control
- Three user roles: ADMIN, STAFF (Doctor), and PATIENT
- JWT-based authentication with role claims
- Automatic role-based dashboard routing
- Protected routes with authentication verification

### Login Credentials (Default Seed Data)
- Admin: `admin@eva-hospital.com` / `admin123`
- Staff: `staff@eva-hospital.com` / `staff123`
- Patient: `patient@eva-hospital.com` / `patient123`

## Role-Specific Dashboards

### Admin Dashboard (`/dashboard/admin`)
- Complete system overview with statistics
- Manage all appointments, patients, and doctors
- Add/edit/delete doctors and patients
- Schedule appointments for any patient
- View system-wide analytics

### Doctor Dashboard (`/dashboard/doctor`)
- Personal appointment management
- Today's schedule overview
- Appointment status tracking (booked/completed/cancelled)
- Patient appointment details
- Statistics: total appointments, today's schedule, completed visits

### Patient Dashboard (`/dashboard/patient`)
- Personal appointment history
- Upcoming appointments overview
- Next appointment details
- Appointment statistics (total/upcoming/completed)
- Patient analytics and demographics

## Patient Management

### Patient Registration
- Personal information management
- Medical history tracking
- Document upload capability
- Insurance information

### Appointment System
- Schedule appointments
- Automated reminders
- Cancellation management
- Waiting list management

## Doctor Management

### Schedule Management
- Work hours configuration
- Leave management
- Appointment slots
- Emergency availability

### Patient Care
- Medical records access
- Prescription writing
- Treatment planning
- Follow-up scheduling

## Administrative Features

### Staff Management
- Employee records
- Shift scheduling
- Performance tracking
- Payroll integration

### Inventory Control
- Stock management
- Automated ordering
- Usage tracking
- Supplier management
