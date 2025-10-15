# API Documentation

## Authentication

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "string",
    "password": "string"
}
POST /api/patients
Authorization: Bearer {token}
Content-Type: application/json

{
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "date",
    "gender": "string",
    "contactNumber": "string",
    "email": "string",
    "address": "string"
}
GET /api/patients
Authorization: Bearer {token}
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
    "patientId": "integer",
    "doctorId": "integer",
    "appointmentDate": "date",
    "appointmentTime": "time",
    "notes": "string"
}
