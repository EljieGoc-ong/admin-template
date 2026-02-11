# Model Design Standards (TypeScript)

## Data Shapes
- Define shared shapes in `frontend/src/types`.
- Prefer `type` aliases for data objects.
- Use string unions for bounded values (e.g., `status: 'Open' | 'Closed'`).

## Optional Fields
- Mark optional fields with `?` and handle nullability explicitly.

## AI Agent Rules
1. **ALWAYS** define types for shared data shapes.
2. **ALWAYS** use unions for constrained values.
3. **NEVER** use `any` for shared models.