# Security Setup Guide

## 🔐 Environment Variables Configuration

This project uses environment variables to keep sensitive information secure. **Never commit your `.env` file to version control!**

---

## Quick Start

### 1. Backend Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Generate a secure JWT secret:**
   - Visit: https://generate-random.org/api-key-generator
   - Or use command line:
     ```bash
     # On Linux/Mac
     openssl rand -base64 64

     # On Windows PowerShell
     -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
     ```

3. **Update your `.env` file:**
   ```env
   DB_URL=jdbc:mysql://localhost:3308/eva_hospital_db
   DB_USERNAME=root
   DB_PASSWORD=root
   JWT_SECRET=<YOUR_GENERATED_SECRET_HERE>
   JWT_EXPIRATION=3600000
   ```

### 2. Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Verify the API URL (default should work):**
   ```env
   VITE_API_URL=http://localhost:8080/api/v1
   ```

---

## Running with Docker

Docker Compose will automatically load environment variables from your `.env` file:

```bash
# Make sure .env exists in the root directory
docker-compose up --build
```

---

## Important Security Notes

### ✅ DO:
- Keep your `.env` file private and local
- Use different JWT secrets for different environments
- Generate strong, random secrets (minimum 32 characters)
- Regularly rotate your JWT secret in production environments

### ❌ DON'T:
- **Never** commit `.env` to git (it's already in `.gitignore`)
- **Never** share your JWT secret publicly
- **Never** use the example secret in production
- **Never** hardcode secrets in source code

---

## For Learning/Portfolio Projects

Since this is a **learning project**, we're using simple local credentials (`root/root`). This is acceptable for:
- ✅ Local development
- ✅ Learning purposes
- ✅ Portfolio demonstrations (on your local machine)

**However**, if you plan to:
- Deploy online (even for demo)
- Share with others
- Use real data

Then you **MUST**:
1. Use strong, unique passwords
2. Use a properly generated JWT secret
3. Consider using a secrets management service

---

## Troubleshooting

### Error: "JWT_SECRET not set"
**Solution:** Make sure you have a `.env` file in the root directory with `JWT_SECRET` defined.

### Error: "Database connection failed"
**Solution:**
1. Check if MySQL is running: `docker ps`
2. Verify `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` in `.env`
3. Try restarting containers: `docker-compose down && docker-compose up`

### Frontend can't connect to backend
**Solution:** Check that `VITE_API_URL` in `frontend/.env` matches your backend URL.

---

## What Changed for Security?

| Before | After | Why |
|--------|-------|-----|
| JWT secret hardcoded in `application.properties` | JWT secret in `.env` file | Secrets shouldn't be in version control |
| Database password in docker-compose | Database password from environment | Same credentials across all environments is risky |
| No `.env.example` | `.env.example` with instructions | Other developers know what variables are needed |
| Credentials in git | `.env` in `.gitignore` | Prevents accidental commits of secrets |

---

## Additional Resources

- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Spring Security Best Practices](https://docs.spring.io/spring-security/reference/features/index.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Remember:** This setup provides basic security for learning. For production applications, consider:
- Using a secrets management service (HashiCorp Vault, AWS Secrets Manager)
- Implementing proper key rotation
- Adding additional security layers (rate limiting, HTTPS, etc.)
