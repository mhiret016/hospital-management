# System Architecture

For comprehensive architecture documentation, see:
- **[Complete Architecture Guide](ARCHITECTURE.md)** - NOT YET CREATED (will be similar to REQUEST_FLOW.md)
- **[Request/Response Flow](REQUEST_FLOW.md)** - Detailed walk-through of complete data flow
- **[Interview Guide](INTERVIEW_GUIDE.md)** - Architecture questions and answers

## Quick Overview

### Three-Tier Architecture
```
Frontend (React) → Backend (Spring Boot) → Database (MySQL)
```

### Backend Layers
```
Controller → Service → Repository → Entity → Database
```

### Key Patterns
- **Layered Architecture**: Clear separation of concerns
- **DTO Pattern**: API contracts separate from entities
- **Dependency Injection**: Spring manages object creation
- **Repository Pattern**: Data access abstraction

For detailed diagrams and explanations, see the complete documentation above.
