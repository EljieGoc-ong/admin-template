# API Standards (React + Flask)

## Goals
- Clear request/response contracts.
- Consistent status codes and error shapes.
- Backward-compatible changes.

## HTTP Conventions
- Use JSON for request/response bodies.
- Prefer `GET` for reads, `POST` for actions, `PUT/PATCH` for updates, `DELETE` for removals.
- Keep URLs noun-based (e.g., `/agents`, `/webhook`).

## Responses
- Use consistent shapes:
  - Success: `{ data: ..., message?: string }`
  - Error: `{ error: { code, message, details? } }`
- Use appropriate status codes (`200`, `201`, `400`, `401`, `403`, `404`, `409`, `422`, `500`).

## Authentication
- If endpoints require auth, document the mechanism and headers.
- Never log secrets or raw tokens.

## Versioning
- Prefer `/v1/...` if introducing breaking changes.
- Add new fields instead of breaking existing fields.

## AI Agent Rules
1. **ALWAYS** document request/response payloads.
2. **ALWAYS** return consistent error objects.
3. **NEVER** ship breaking changes without versioning.
