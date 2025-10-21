# 🔄 Complete Request/Response Flow

## Example: Creating a New Patient

This document walks through EVERY step when a user creates a new patient, showing exactly what happens at each layer.

---

## Frontend Flow (React)

###  1. User Fills Form
**File**: `frontend/src/components/patients/NewPatientForm.tsx`

```typescript
// User enters data in the form:
const initialValues: PatientFormValues = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  biologicalSex: "MALE",
  phone: "555-1234",
  address: "123 Main St",
  allergies: "Penicillin, Peanuts"
};
```

**Data Type**: `PatientFormValues` (TypeScript interface)

---

### 2. Client-Side Validation
**Library**: Yup validation schema

```typescript
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(150, "First name must be less than 150 characters")
    .required("First name is required"),
  // ... other fields
});
```

**What happens**:
- ✅ Checks minimum/maximum length
- ✅ Checks required fields
- ✅ Validates date format
- ✅ Validates phone number pattern
- ❌ If validation fails → Show error message, stop here
- ✅ If validation passes → Continue to step 3

---

### 3. Form Submission
**Hook**: `useMutation` from React Query

```typescript
const createPatientMutation = useMutation({
  mutationFn: async (values: PatientFormValues) => {
    const response = await axiosInstance.post("/patient/add-patient", {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      biologicalSex: values.biologicalSex,
      phone: values.phone,
      address: values.address,
      allergies: values.allergies,
    });
    return response.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["patients"] });
    onClose();
  },
});

// Triggered on form submit:
createPatientMutation.mutate(values);
```

**What happens**:
- Function is called with form values
- React Query tracks the mutation state (loading, error, success)
- Proceeds to HTTP request

---

### 4. HTTP Request
**Library**: Axios

```typescript
POST http://localhost:8080/api/v1/patient/add-patient

Headers:
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "biologicalSex": "MALE",
  "phone": "555-1234",
  "address": "123 Main St",
  "allergies": "Penicillin, Peanuts"
}
```

**Data transformation**:
- JavaScript object → JSON string
- Sent over HTTP protocol
- Token added from localStorage

---

## Backend Flow (Spring Boot)

### 5. Request Arrives at Server
**Component**: Embedded Tomcat Server (Port 8080)

```
Tomcat receives TCP connection on port 8080
Parses HTTP request
Creates HttpServletRequest object
Passes to Spring DispatcherServlet
```

---

### 6. CORS Filter
**File**: `config/CorsConfig.java`

```java
@Bean
public CorsFilter corsFilter() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173",
        "http://localhost:5174"
    ));
    // ... more config
}
```

**What happens**:
- Checks request origin: `http://localhost:5173`
- ✅ Origin is in allowed list → Continue
- ❌ If not allowed → 403 Forbidden, stop here

---

### 7. JWT Authentication Filter
**File**: `config/JwtAuthenticationFilter.java`

```java
@Override
protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
) {
    // 1. Extract token from Authorization header
    String authHeader = request.getHeader("Authorization");
    String token = authHeader.substring(7); // Remove "Bearer "

    // 2. Extract username from token
    String username = jwtService.extractUsername(token);

    // 3. Validate token
    if (jwtService.isTokenValid(token, userDetails)) {
        // 4. Set authentication in SecurityContext
        UsernamePasswordAuthenticationToken authToken =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
            );
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    // 5. Continue filter chain
    filterChain.doFilter(request, response);
}
```

**What happens**:
- Extracts JWT: `"eyJhbGciOiJIUzI1NiI..."`
- Decodes JWT to get email: `"admin@eva-hospital.com"`
- Verifies signature using `JWT_SECRET`
- Checks expiration time
- Loads user from database
- ✅ Token valid → Sets SecurityContext, continue
- ❌ Token invalid → 401 Unauthorized, stop here

**Security Context now contains**:
```java
Authentication {
    principal: "admin@eva-hospital.com"
    authorities: [ROLE_ADMIN]
    authenticated: true
}
```

---

### 8. DispatcherServlet Routing
**Component**: Spring DispatcherServlet

```
URL: /api/v1/patient/add-patient
Method: POST

Searches for @RestController with matching @RequestMapping
Finds: PatientController
Finds method with @PostMapping("/add-patient")
```

---

### 9. Controller Layer
**File**: `controllers/PatientController.java`

```java
@RestController
@RequestMapping("/api/v1/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/add-patient")
    public ResponseEntity<PatientInformation> postNewPatient(
        @RequestBody @Valid PostNewPatientRequest request
    ) {
        return ResponseEntity
            .created(null)
            .body(patientService.createPatient(request));
    }
}
```

**What happens**:

1. **JSON → DTO Conversion** (Jackson ObjectMapper)
   ```
   JSON String → PostNewPatientRequest object
   ```

2. **Bean Validation** (`@Valid`)
   ```java
   // PostNewPatientRequest.java
   public record PostNewPatientRequest(
       @NotBlank(message = "First name is required")
       @Size(min = 2, max = 150)
       String firstName,

       @NotBlank(message = "Last name is required")
       @Size(min = 2, max = 150)
       String lastName,

       @NotNull
       @Past(message = "Date of birth must be in the past")
       LocalDate dateOfBirth,

       // ... more validations
   )
   ```
   - ✅ All validations pass → Continue
   - ❌ Validation fails → 400 Bad Request with error details

3. **Delegate to Service**
   ```java
   patientService.createPatient(request)
   ```

**Data Type**: `PostNewPatientRequest` (DTO record)

---

### 10. Service Layer
**File**: `services/PatientServiceImpl.java`

```java
@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public PatientInformation createPatient(PostNewPatientRequest request) {
        // 1. Split allergies string into list
        List<String> allergiesList = Arrays.stream(
            request.allergies().split(",")
        )
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .collect(Collectors.toList());

        // 2. Find doctor by ID
        Doctor doctor = doctorRepository.findById(request.doctorId())
            .orElseThrow(() -> new DoctorNotFoundException(
                "Doctor not found with id: " + request.doctorId()
            ));

        // 3. Create Patient entity
        Patient patient = new Patient();
        patient.setFirstName(request.firstName());
        patient.setLastName(request.lastName());
        patient.setDateOfBirth(request.dateOfBirth());
        patient.setBiologicalSex(request.biologicalSex());
        patient.setPhone(request.phone());
        patient.setAddress(request.address());
        patient.setAllergies(allergiesList);
        patient.setPrimaryDoctor(doctor);

        // 4. Save to database
        Patient savedPatient = patientRepository.save(patient);

        // 5. Convert entity to DTO
        return convertToDTO(savedPatient);
    }

    private PatientInformation convertToDTO(Patient patient) {
        DoctorInformation doctorInfo = new DoctorInformation(
            patient.getPrimaryDoctor().getId(),
            patient.getPrimaryDoctor().getFirstName(),
            patient.getPrimaryDoctor().getLastName(),
            patient.getPrimaryDoctor().getSpecialization(),
            patient.getPrimaryDoctor().getDepartment(),
            patient.getPrimaryDoctor().getPhone(),
            null // Don't include patients list to avoid circular reference
        );

        return new PatientInformation(
            patient.getId(),
            patient.getFirstName(),
            patient.getLastName(),
            patient.getDateOfBirth(),
            patient.getBiologicalSex(),
            patient.getPhone(),
            patient.getAddress(),
            patient.getAllergies(),
            doctorInfo
        );
    }
}
```

**What happens**:
1. **Business Logic**: Split allergies string `"Penicillin, Peanuts"` → `["Penicillin", "Peanuts"]`
2. **Database Query**: Find doctor with id = 1
3. **DTO → Entity**: Convert `PostNewPatientRequest` → `Patient` entity
4. **Save**: Call repository to persist
5. **Entity → DTO**: Convert `Patient` entity → `PatientInformation` DTO

**Data transformations**:
- `PostNewPatientRequest` (DTO) → `Patient` (Entity) → `PatientInformation` (DTO)

---

### 11. Repository Layer
**File**: `repositories/PatientRepository.java`

```java
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Spring Data JPA provides save() method automatically
}
```

**What happens**:
```java
Patient savedPatient = patientRepository.save(patient);
```

Spring Data JPA:
1. Detects this is a new entity (id is null)
2. Generates INSERT SQL statement
3. Executes query via Hibernate
4. Returns entity with generated ID

---

### 12. Database (MySQL)
**SQL Generated by Hibernate**:

```sql
INSERT INTO patient (
    first_name,
    last_name,
    date_of_birth,
    biological_sex,
    phone,
    address,
    doctor_id
) VALUES (
    'John',
    'Doe',
    '1990-01-01',
    'MALE',
    '555-1234',
    '123 Main St',
    1
);

-- MySQL generates ID: 42
-- Returns row with id = 42
```

**Allergies** are stored in a separate table (ElementCollection):
```sql
INSERT INTO patient_allergies (patient_id, allergies)
VALUES (42, 'Penicillin'), (42, 'Peanuts');
```

**Database Transaction**:
- @Transactional on service method ensures atomicity
- If any query fails → Rollback all changes
- If all succeed → Commit transaction

---

### 13. Back Up the Layers

**Repository → Service**:
```java
Patient savedPatient = [Patient with id=42, firstName="John", ...]
```

**Service → Controller**:
```java
PatientInformation dto = new PatientInformation(
    42L,                    // id
    "John",                 // firstName
    "Doe",                  // lastName
    LocalDate.of(1990,1,1), // dateOfBirth
    BiologicalSex.MALE,     // biologicalSex
    "555-1234",             // phone
    "123 Main St",          // address
    ["Penicillin", "Peanuts"], // allergies
    doctorInfo              // primaryDoctor
);
```

**Controller → HTTP Response**:
```java
return ResponseEntity
    .created(URI.create("/api/v1/patient/42"))
    .body(dto);
```

---

### 14. HTTP Response
**Jackson ObjectMapper** converts DTO to JSON:

```
Status: 201 Created
Headers:
{
  "Content-Type": "application/json",
  "Location": "/api/v1/patient/42"
}

Body:
{
  "id": 42,
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "biologicalSex": "MALE",
  "phone": "555-1234",
  "address": "123 Main St",
  "allergies": ["Penicillin", "Peanuts"],
  "primaryDoctor": {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Smith",
    "specialization": "Cardiology",
    "department": "Emergency",
    "phone": "555-9999"
  }
}
```

**Data transformation**:
- `PatientInformation` object → JSON string
- Sent over HTTP

---

## Frontend Response Handling

### 15. Axios Receives Response

```typescript
// In api/index.ts
const response = await axiosInstance.post("/patient/add-patient", data);
// response.status = 201
// response.data = { id: 42, firstName: "John", ... }
return response.data;
```

---

### 16. React Query Handles Success

```typescript
const createPatientMutation = useMutation({
  mutationFn: async (values) => { ... },
  onSuccess: () => {
    // 1. Invalidate cached patient list
    queryClient.invalidateQueries({ queryKey: ["patients"] });

    // 2. Close the form modal
    onClose();
  },
});
```

**What happens**:
1. **Cache Invalidation**: Marks "patients" query as stale
2. **Auto Refetch**: React Query automatically refetches patient list
3. **UI Update**: DataGrid re-renders with new patient

---

### 17. UI Updates

```typescript
// PatientIndex.tsx
const { data: patients } = useQuery({
  queryKey: ["patients"],
  queryFn: getAllPatients,
});

// React re-renders with new data:
<DataGrid rows={patients} ... />
```

**What user sees**:
- ✅ Form closes
- ✅ Loading spinner briefly appears
- ✅ Patient list refreshes
- ✅ New patient "John Doe" appears in table

---

## Summary of Type Conversions

| Layer | From → To |
|-------|-----------|
| **Frontend Form** | JavaScript Object → JSON String |
| **HTTP Request** | JSON String → Network Bytes |
| **Backend Controller** | Network Bytes → JSON String → `PostNewPatientRequest` (DTO) |
| **Service Layer** | `PostNewPatientRequest` (DTO) → `Patient` (Entity) |
| **Repository** | `Patient` (Entity) → SQL INSERT |
| **Database** | SQL → Database Row (bytes on disk) |
| **Repository** | Database Row → `Patient` (Entity) |
| **Service Layer** | `Patient` (Entity) → `PatientInformation` (DTO) |
| **Controller** | `PatientInformation` (DTO) → JSON String |
| **HTTP Response** | JSON String → Network Bytes |
| **Frontend Axios** | Network Bytes → JSON String → JavaScript Object |
| **React Component** | JavaScript Object → React State → UI |

---

## HTTP Details

### Request
- **Method**: POST (because we're creating a resource)
- **Status**: N/A (requests don't have status)
- **Content-Type**: application/json
- **Authorization**: Bearer token (JWT)

### Response
- **Method**: N/A (responses don't have methods)
- **Status**: 201 Created (indicates successful resource creation)
- **Content-Type**: application/json
- **Location**: /api/v1/patient/42 (URI of created resource)

---

## Key Takeaways

1. **Every layer has a purpose**:
   - Controller: HTTP handling
   - Service: Business logic
   - Repository: Data access
   - Entity: Database mapping

2. **Data is transformed at each layer**:
   - DTOs for API contracts
   - Entities for database
   - Never expose entities directly

3. **Security is layered**:
   - Client validation (UX)
   - Server validation (security)
   - JWT authentication (identity)
   - Database constraints (data integrity)

4. **React Query manages complexity**:
   - Caching
   - Automatic refetching
   - Loading states
   - Error handling

5. **HTTP is just transport**:
   - JSON is the data format
   - Status codes indicate result
   - Headers provide metadata

---

**This is what happens in EVERY request** - just with different data, different endpoints, and different business logic!
