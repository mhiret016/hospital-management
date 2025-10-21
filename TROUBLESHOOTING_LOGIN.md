# 🔧 Login Troubleshooting Guide

## Issue: "Invalid email or password" Error

If you're seeing "Invalid email or password" when trying to login, follow these steps:

### Step 1: Verify Backend is Running ✅

Check if your Spring Boot backend is running on port 8080:

```bash
# In terminal, check if port 8080 is in use
# Windows (PowerShell):
netstat -ano | findstr :8080

# Or try to access:
curl http://localhost:8080/actuator/health
```

**Expected output**: `{"status":"UP"}`

If not running, start it:
```bash
mvn spring-boot:run
```

### Step 2: Check Database Connection 🗄️

Verify MySQL is running and accessible:

```bash
# Windows (PowerShell):
netstat -ano | findstr :3308

# Or connect directly:
mysql -u root -p -h localhost -P 3308
# Password: root
```

Once connected:
```sql
USE eva_hospital_db;
SELECT * FROM user_credentials;
```

**Expected output**: Should show 3 users (admin, staff, patient)

### Step 3: Check if Seeder Ran 🌱

Look for this in your Spring Boot console logs:

```
========================================
LOGIN CREDENTIALS:
Admin    : admin@eva-hospital.com / admin123
Staff    : staff@eva-hospital.com / staff123
Patient  : patient@eva-hospital.com / patient123
========================================
```

**If you DON'T see this:**

The seeder didn't run because the database already has users. You need to either:

#### Option A: Reset the Database (Recommended)

```sql
-- Connect to MySQL
mysql -u root -p -h localhost -P 3308

-- Drop all tables to force re-seeding
DROP DATABASE eva_hospital_db;

-- Restart Spring Boot application
-- It will recreate everything
```

#### Option B: Manually Insert Admin User

```sql
USE eva_hospital_db;

-- Insert admin user with BCrypt password for "admin123"
INSERT INTO user_credentials (email, password, role, created_at, updated_at)
VALUES (
    'admin@eva-hospital.com',
    '$2a$10$8K1p/a0dL3gJdBNAFI7WnO6QDLGEbqNYPzJ5QFq3bZi2PeXKwRE9C',
    'ADMIN',
    NOW(),
    NOW()
);
```

### Step 4: Verify Frontend API URL 🌐

Check your frontend `.env` file:

```bash
cd frontend
cat .env
```

**Expected content**:
```
VITE_API_URL=http://localhost:8080/api/v1
```

If it's different or missing, create/update it and restart the frontend:
```bash
npm run dev
```

### Step 5: Clear Browser Cache & LocalStorage 🧹

Sometimes old JWT tokens cause issues:

1. Open browser DevTools (F12)
2. Go to **Application** (Chrome) or **Storage** (Firefox)
3. Under **Local Storage** → `http://localhost:5173`
4. Delete `jwt_token` if it exists
5. Refresh the page

### Step 6: Check Network Request 🔍

When you click "Sign In", open browser DevTools (F12) and check the **Network** tab:

1. Look for a POST request to `/api/v1/auth/login`
2. Check the **Request Payload**:
   ```json
   {
     "email": "admin@eva-hospital.com",
     "password": "admin123"
   }
   ```
3. Check the **Response**:
   - **200 OK**: Should return JWT token (long string)
   - **401 Unauthorized**: Wrong credentials
   - **500 Error**: Backend problem
   - **Failed to fetch**: Backend not running

### Step 7: Test Login with cURL 🧪

Test the backend directly:

```bash
# Test registration (optional)
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Test login with admin account
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eva-hospital.com","password":"admin123"}'
```

**Expected output**: A JWT token string like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Step 8: Check Spring Boot Logs 📝

Look at your backend console for errors:

**Common issues**:
- `UsernameNotFoundException`: User doesn't exist in database
- `BadCredentialsException`: Wrong password
- `SQLException`: Database connection issue
- `JWTException`: Token generation problem

### Step 9: Verify Email Case Sensitivity 🔤

The system converts all emails to lowercase. Try:
- ✅ `admin@eva-hospital.com`
- ❌ `Admin@eva-hospital.com` (will be converted to lowercase)
- ❌ `ADMIN@EVA-HOSPITAL.COM` (will be converted to lowercase)

All should work, but internally stored as lowercase.

## Quick Fix Checklist ✅

- [ ] Backend running on port 8080
- [ ] MySQL running on port 3308
- [ ] Database `eva_hospital_db` exists
- [ ] Table `user_credentials` has 3 users
- [ ] Frontend `.env` has correct API URL
- [ ] Browser localStorage is clear
- [ ] Network request shows 200 OK response
- [ ] Correct credentials: `admin@eva-hospital.com` / `admin123`

## Nuclear Option: Complete Reset 💣

If nothing works, start fresh:

```bash
# 1. Stop all services
# CTRL+C in all terminals

# 2. Drop database
mysql -u root -p -h localhost -P 3308 -e "DROP DATABASE eva_hospital_db;"

# 3. Clear frontend build
cd frontend
rm -rf node_modules dist .vite
npm install

# 4. Restart backend (will recreate DB)
cd ..
mvn clean install
mvn spring-boot:run

# 5. Wait for seeder message in console
# Look for: "========================================
#            LOGIN CREDENTIALS:
#            ========================================"

# 6. Start frontend
cd frontend
npm run dev

# 7. Try login again
# Email: admin@eva-hospital.com
# Password: admin123
```

## Still Not Working? 🆘

### Check the following:

1. **Java Version**: Should be Java 21
   ```bash
   java -version
   ```

2. **Maven Version**: Should be 3.6+
   ```bash
   mvn -version
   ```

3. **Node Version**: Should be 18+
   ```bash
   node -version
   ```

4. **MySQL Version**: Should be 8.0+
   ```bash
   mysql --version
   ```

### Enable Debug Logging

Add to `application.properties`:
```properties
logging.level.org.springframework.security=DEBUG
logging.level.com.example.health.hospital_management=DEBUG
```

Restart backend and check logs for detailed error messages.

## Common Passwords (After Seeding)

| Email | Password | Role |
|-------|----------|------|
| `admin@eva-hospital.com` | `admin123` | ADMIN |
| `staff@eva-hospital.com` | `staff123` | STAFF |
| `patient@eva-hospital.com` | `patient123` | PATIENT |

## Test Account Creation

If you want to test the registration flow instead:

1. Go to `http://localhost:5173/register`
2. Enter a new email (e.g., `mytest@example.com`)
3. Enter password (min 6 characters)
4. Click "Register"
5. You'll be redirected to Login
6. Use your new credentials to login

---

**Still having issues? Share the exact error message from:**
1. Browser Console (F12 → Console tab)
2. Network tab (F12 → Network → click the failed request → Response)
3. Spring Boot console logs
