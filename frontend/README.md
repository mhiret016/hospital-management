# Hospital Management System - Frontend

React + TypeScript + Vite application for the Hospital Management System.

## Features

### Role-Based Dashboards

The application implements three role-specific dashboards with automatic routing based on JWT authentication:

#### Admin Dashboard (`/dashboard/admin`)
- System-wide statistics (total patients, doctors, appointments)
- Complete appointment management
- Patient and doctor management
- Add/edit/delete capabilities for all entities

#### Doctor Dashboard (`/dashboard/doctor`)
- Personal appointment overview
- Today's schedule
- Appointment statistics (total, completed, active/cancelled)
- Patient appointment details

#### Patient Dashboard (`/dashboard/patient`)
- Personal appointment history
- Upcoming appointments
- Next appointment details
- Patient demographics and statistics

### Authentication

- JWT-based authentication with automatic role detection
- Automatic redirection to role-specific dashboards
- Protected routes requiring authentication
- Role extraction from JWT payload

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI (MUI)** for UI components
- **React Router** for routing
- **TanStack Query** for data fetching and caching
- **Axios** for API calls
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8080/api/v1
```

### Default Login Credentials

| Role    | Email                    | Password   |
|---------|--------------------------|------------|
| Admin   | admin@eva-hospital.com   | admin123   |
| Staff   | staff@eva-hospital.com   | staff123   |
| Patient | patient@eva-hospital.com | patient123 |

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── dashboards/
│   │   │   ├── AdminDashboard.tsx      # Admin role dashboard
│   │   │   ├── DoctorDashboard.tsx     # Staff role dashboard
│   │   │   └── PatientDashboard.tsx    # Patient role dashboard
│   │   ├── appointments/               # Appointment components
│   │   ├── doctors/                    # Doctor management components
│   │   ├── patients/                   # Patient management components
│   │   └── shared/                     # Shared components
│   ├── pages/
│   │   ├── Login.tsx                   # Login page with role-based routing
│   │   └── Register.tsx                # User registration
│   ├── static/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── types/
│   │   └── index.ts                    # TypeScript type definitions
│   ├── App.tsx                         # Main app with route definitions
│   └── main.tsx
├── api/
│   └── index.ts                        # API calls and axios configuration
└── package.json
```

## Key Implementation Details

### JWT Role-Based Routing

The `Login.tsx` component decodes the JWT token after successful authentication to extract the user's role and automatically routes them to the appropriate dashboard:

- `ADMIN` → `/dashboard/admin`
- `STAFF` → `/dashboard/doctor`
- `PATIENT` → `/dashboard/patient`

### Protected Routes

All dashboard routes are wrapped with a `ProtectedRoute` component that checks for a valid JWT token in localStorage.

## Vite Configuration

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
