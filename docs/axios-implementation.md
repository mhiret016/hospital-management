# Axios Implementation Guide

## Overview

Axios is used as the HTTP client for all API communications between the React frontend and the Spring Boot backend. This document explains how and why Axios was implemented in our Hospital Management System.

## Why Axios?

### Advantages Over Native Fetch API

1. **Automatic JSON Transformation**
   - Axios automatically transforms JSON data, eliminating the need to call `.json()` on every response
   - Reduces boilerplate code in API calls

2. **Request/Response Interceptors**
   - Built-in support for interceptors to modify requests and responses globally
   - Perfect for adding JWT tokens to all authenticated requests
   - Enables centralized error handling

3. **Better Error Handling**
   - Automatically rejects promises for HTTP errors (4xx, 5xx status codes)
   - Provides detailed error information in a consistent format

4. **TypeScript Support**
   - Excellent TypeScript definitions out of the box
   - Generic type support for requests and responses

5. **Browser Compatibility**
   - Works consistently across all modern browsers
   - Handles older browsers better than fetch

6. **Request Cancellation**
   - Built-in support for canceling requests (useful for search features and cleanup)

## Implementation Details

### Configuration (frontend/api/index.ts)

```typescript
import axios, { type AxiosResponse } from "axios";

// Create centralized axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // http://localhost:8080/api/v1
});

// Request interceptor for JWT authentication
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Key Features

#### 1. Centralized Base URL
- All API endpoints share the same base URL from environment variables
- Easy to switch between development, staging, and production environments
- Single point of configuration

#### 2. Automatic JWT Token Injection
- Request interceptor automatically adds `Authorization` header to all requests
- No need to manually include tokens in every API call
- Consistent authentication across the entire application

#### 3. Type-Safe API Calls

```typescript
// Example: Type-safe patient fetching
export const getAllPatients = async (): Promise<PatientInformation[]> => {
  const response: AxiosResponse<PatientInformation[]> =
    await axiosInstance.get("/patient/");

  if (response.status !== 200) {
    throw new Error("An error has occurred while fetching the data");
  }

  return response.data; // Automatically typed as PatientInformation[]
};
```

## Use Cases in Our Project

### 1. Authentication
```typescript
// Login - returns JWT token
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<string> => {
  const response: AxiosResponse<string> = await axiosInstance.post(
    "/auth/login",
    credentials
  );
  return response.data; // JWT token
};
```

### 2. Data Fetching with React Query
```typescript
// Used with TanStack Query for caching and state management
const { data: patients } = useQuery({
  queryKey: ["patients"],
  queryFn: getAllPatients, // Axios-based function
});
```

### 3. CRUD Operations
```typescript
// Create
export const createAppointment = async (
  request: PostNewAppointmentRequest
): Promise<AppointmentInformation> => {
  const response = await axiosInstance.post("/appointment/", request);
  return response.data;
};

// Read
export const getAppointmentById = async (
  id: number
): Promise<AppointmentInformation> => {
  const response = await axiosInstance.get(`/appointment/${id}`);
  return response.data;
};

// Update
export const updateAppointment = async (
  id: number,
  request: UpdateAppointmentRequest
): Promise<AppointmentInformation> => {
  const response = await axiosInstance.put(`/appointment/${id}`, request);
  return response.data;
};

// Delete
export const cancelAppointment = async (
  id: number
): Promise<AppointmentInformation> => {
  const response = await axiosInstance.delete(`/appointment/${id}`);
  return response.data;
};
```

## Architecture Benefits

### 1. Separation of Concerns
- API logic is separated from component logic
- All API calls are centralized in `frontend/api/index.ts`
- Components remain clean and focused on UI

### 2. Consistency
- All HTTP requests follow the same pattern
- Uniform error handling across the application
- Consistent response types

### 3. Maintainability
- Easy to modify API calls in one place
- Simple to add global request/response transformations
- Clear type definitions for all API operations

### 4. Security
- Centralized token management
- Automatic inclusion of authentication headers
- Reduced risk of forgetting to include tokens

## Integration with React Query

Axios works seamlessly with TanStack Query (React Query) for:
- **Automatic caching** of API responses
- **Background refetching** for fresh data
- **Optimistic updates** for better UX
- **Query invalidation** after mutations

```typescript
// Example: Mutation with React Query
const loginMutation = useMutation({
  mutationFn: login, // Axios-based login function
  onSuccess: (token) => {
    localStorage.setItem("jwt_token", token);
    // Decode JWT and route to appropriate dashboard
  },
});
```

## Error Handling Strategy

### HTTP Error Status Codes
```typescript
// Axios automatically throws on 4xx and 5xx responses
try {
  const response = await axiosInstance.get("/patient/");
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    // Handle network errors, 4xx, 5xx
    console.error("API Error:", error.response?.status);
  }
}
```

### Business Logic Errors
```typescript
// Additional validation after successful HTTP response
export const getAllPatients = async (): Promise<PatientInformation[]> => {
  const response = await axiosInstance.get("/patient/");

  if (response.status !== 200) {
    throw new Error("An error has occurred while fetching the data");
  }

  return response.data;
};
```

## Environment Configuration

### Development
```bash
# frontend/.env
VITE_API_URL=http://localhost:8080/api/v1
```

### Production
```bash
# frontend/.env.production
VITE_API_URL=https://api.eva-hospital.com/api/v1
```

## Best Practices Implemented

1. **Single Axios Instance**: One configured instance for the entire application
2. **Type Safety**: All API functions are strongly typed with TypeScript
3. **Error Handling**: Consistent error handling with proper HTTP status checks
4. **Interceptors**: Global request interceptor for authentication
5. **Base URL**: Environment-based configuration for different deployment environments
6. **Response Validation**: Additional validation beyond HTTP status codes

## Future Enhancements

Potential improvements to consider:

1. **Response Interceptor**: Add global error handling for authentication failures (401/403)
2. **Request Retry Logic**: Automatic retry for failed requests
3. **Timeout Configuration**: Set global timeout for all requests
4. **Request Cancellation**: Implement for search and filter operations
5. **Loading States**: Global loading indicator using interceptors
6. **Offline Support**: Queue requests when offline and retry when connection is restored

## Related Documentation

- [API Documentation](api.md) - Complete API endpoint reference
- [Setup Guide](setup.md) - Environment configuration
- [Frontend README](../frontend/README.md) - Frontend architecture overview
