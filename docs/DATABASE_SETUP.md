# EVA Hospital - Database Setup & Login Guide

## 🗄️ Database Configuration

Your application is configured to connect to:
- **Database**: `eva_hospital_db`
- **Host**: `localhost:3308`
- **Username**: `root`
- **Password**: `root`

The database will be **automatically created** if it doesn't exist (configured in `application-dev.yaml`).

## 🔑 Login Credentials

When you start the application for the first time, it will automatically seed the database with sample data including login accounts.

### Pre-configured Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@eva-hospital.com` | `admin123` |
| **Staff** | `staff@eva-hospital.com` | `staff123` |
| **Patient** | `patient@eva-hospital.com` | `patient123` |

### Recommended for Testing
Use the **Admin** account to access all features:
- **Email**: `admin@eva-hospital.com`
- **Password**: `admin123`

## 📊 Sample Data Included

The seeder automatically creates:

### 👨‍⚕️ 5 Doctors
1. **Dr. Sarah Johnson** - Cardiologist (Cardiology)
2. **Dr. Michael Chen** - Pediatrician (Pediatrics)
3. **Dr. Emily Rodriguez** - Orthopedic Surgeon (Orthopedics)
4. **Dr. David Patel** - Neurologist (Neurology)
5. **Dr. Jennifer Williams** - General Practitioner (General Medicine)

### 👥 8 Patients
1. **John Doe** - Primary Doctor: Dr. Sarah Johnson
2. **Jane Smith** - Primary Doctor: Dr. Michael Chen
3. **Robert Brown** - Primary Doctor: Dr. Emily Rodriguez
4. **Maria Garcia** - Primary Doctor: Dr. David Patel
5. **William Taylor** - Primary Doctor: Dr. Jennifer Williams
6. **Elizabeth Martinez** - Primary Doctor: Dr. Sarah Johnson
7. **James Anderson** - Primary Doctor: Dr. Michael Chen
8. **Patricia Lee** - Primary Doctor: Dr. Emily Rodriguez

Each patient has:
- Complete personal information (name, DOB, phone, address)
- Biological sex
- Allergies (where applicable)
- Assigned primary doctor

## 🚀 Getting Started

### 1. Start MySQL Database

Make sure MySQL is running on port 3308:

```bash
# If using Docker
docker-compose up -d

# Or start MySQL service manually
```

### 2. Start the Backend

```bash
# From the project root
mvn spring-boot:run

# Or if using an IDE, run HospitalManagementApplication.java
```

**Look for this in the console:**
```
========================================
LOGIN CREDENTIALS:
Admin    : admin@eva-hospital.com / admin123
Staff    : staff@eva-hospital.com / staff123
Patient  : patient@eva-hospital.com / patient123
========================================
```

### 3. Start the Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### 4. Access the Application

Open your browser and go to: `http://localhost:5173`

1. Click **"Login"** button
2. Enter credentials:
   - **Email**: `admin@eva-hospital.com`
   - **Password**: `admin123`
3. Click **"Sign In"**
4. You'll be redirected to the Dashboard with all sample data!

## 🔄 Re-seeding the Database

If you want to reset and re-seed the database:

```sql
-- Connect to MySQL
mysql -u root -p -h localhost -P 3308

-- Drop the database
DROP DATABASE eva_hospital_db;

-- Restart the Spring Boot application
-- It will recreate the database and seed it automatically
```

## 📝 Creating New User Accounts

### Option 1: Use the Register Page
1. Go to `http://localhost:5173/register`
2. Enter email and password
3. Click "Register"
4. Login with your new credentials

### Option 2: Directly in Database
```sql
-- Insert new user (password will need to be BCrypt hashed)
-- Note: The password below is "password123" BCrypt hashed
INSERT INTO user_credentials (email, password, role)
VALUES ('newuser@example.com', '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'STAFF');
```

## 🔍 Checking Database Contents

```sql
-- Connect to database
mysql -u root -p -h localhost -P 3308

-- Use the database
USE eva_hospital_db;

-- View all users
SELECT * FROM user_credentials;

-- View all doctors
SELECT * FROM eva_doctors;

-- View all patients
SELECT * FROM eva_patients;

-- View all appointments
SELECT * FROM eva_appointments;
```

## ⚙️ How the Seeder Works

The `DataSeeder.java` class:
- Runs automatically on application startup
- Checks if tables are empty before seeding
- Only seeds once (won't duplicate data on restart)
- Uses `CommandLineRunner` interface
- Creates BCrypt-encrypted passwords
- Assigns patients to doctors with proper relationships

## 🛠️ Troubleshooting

### "Cannot connect to database"
- Ensure MySQL is running on port 3308
- Check credentials in `application-dev.yaml`
- Verify database exists: `SHOW DATABASES;`

### "Login fails with correct credentials"
- Check console logs for seeder output
- Verify users exist: `SELECT * FROM user_credentials;`
- Ensure backend is running on port 8080
- Check frontend API URL in `.env` file

### "No data showing on dashboard"
- Verify seeder ran successfully (check console logs)
- Check tables: `SELECT COUNT(*) FROM eva_patients;`
- Ensure you're logged in (JWT token present)
- Check browser console for API errors

## 📧 Need Help?

If the seeder doesn't run or you have issues:
1. Check application logs for errors
2. Verify MySQL connection
3. Ensure port 3308 is not in use by another service
4. Check that Spring Boot profile is set to 'dev'

---

**Happy Testing! 🎉**
