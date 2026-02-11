# API & Data Handling Rules

## Response Format Standards
1. **ALWAYS** use consistent response shapes:
   - Success: `{ data: ..., message?: string }`
   - Error: `{ error: { code, message, details? } }`
2. **ALWAYS** document request/response payloads
3. **ALWAYS** use appropriate HTTP status codes
4. **NEVER** log secrets or raw tokens
5. **NEVER** ship breaking API changes without versioning

## HTTP Conventions
- Use JSON for request/response bodies
- Keep URLs noun-based (e.g., `/users`, `/permissions`)
- HTTP Methods:
  - `GET` - Read operations
  - `POST` - Create or actions
  - `PUT/PATCH` - Updates
  - `DELETE` - Removals

## Status Codes
Use appropriate status codes consistently:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `500` - Internal Server Error

## Error Handling
```typescript
// ✅ GOOD - Consistent error shape
{
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid email format',
    details: { field: 'email' }
  }
}
```

## Authentication
- Document required authentication headers
- Never log secrets or raw tokens
- Use secure token storage (localStorage/sessionStorage appropriately)
- Validate permissions on both client and server

## Versioning
- Prefer `/v1/...` when introducing breaking changes
- Add new fields instead of breaking existing ones
- Document deprecation timeline for old endpoints

## Service Layer
Organize API calls in service files:
```typescript
// src/services/api/userService.ts
export const userService = {
  async getUser(id: string) {
    // API call logic
  },
  async updateUser(id: string, data: UpdateUserData) {
    // API call logic
  }
};
```

## Reference
See `.standards/api_standards.md` for complete details.
