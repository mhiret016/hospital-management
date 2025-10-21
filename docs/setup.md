# Setup Guide

## Environment Requirements

- Java: 17 or higher
- Node.js: 18 or higher
- Database: PostgreSQL 14 or higher
- Maven: 3.8 or higher (for backend)
- npm or yarn (for frontend)

## Environment Variables

```bash
# Database Configuration
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=

# JWT Configuration
JWT_SECRET=

# Email Configuration
SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=


## Installation Steps

### Backend Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd hospital-management
```

2. Configure environment variables:
- Create a `.env` file in the root directory
- Add required database and JWT configuration

3. Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will automatically seed the database with default users on first run.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Create a `.env` file in the frontend directory
- Set `VITE_API_URL` to your backend URL (default: http://localhost:8080/api/v1)

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Default Login Credentials

After the initial setup, the following default users are created:

| Role    | Email                        | Password    | Dashboard Route      |
|---------|------------------------------|-------------|---------------------|
| Admin   | admin@eva-hospital.com       | admin123    | /dashboard/admin    |
| Staff   | staff@eva-hospital.com       | staff123    | /dashboard/doctor   |
| Patient | patient@eva-hospital.com     | patient123  | /dashboard/patient  |

## Dashboard Routes

Users are automatically routed to their role-specific dashboard upon login:

- **Admin Dashboard**: `/dashboard/admin` - Full system management
- **Doctor Dashboard**: `/dashboard/doctor` - Appointment and patient management
- **Patient Dashboard**: `/dashboard/patient` - Personal appointments and information

