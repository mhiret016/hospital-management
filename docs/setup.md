# Setup Guide

## Environment Requirements

- Node.js version: [specify version]
- Database: [specify version]
- Other dependencies

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


Installation Steps
1. Clone the repository:

git clone [repository-url]
cd hospital-management

2. Install dependencies
npm install

3. Configure environment variables

- Copy '.env.example' to '.env'

- Fill in required values

4. Run database migrations
npm run migrate

5. Start the application
npm run start

