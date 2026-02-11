# Deprecation Standards

This document outlines the standard process for deprecating code within this project. Following these standards ensures that deprecated code is clearly marked, easily identifiable, and handled consistently across the codebase.

## When to Deprecate

Code should be deprecated when:
- It has been replaced by a new implementation.
- It is no longer used by any part of the application.
- It is kept for backward compatibility but will be removed in a future version.

## Deprecation Process

When deprecating a file (e.g., a service object, controller, or model), follow these steps:

### 1. Add a Deprecation Notice

Add a prominent block comment at the top of the file. This notice must include:
- A clear `DEPRECATED` warning.
- The date of deprecation.
- The reason for deprecation.
- A reference to the new code that replaces it (e.g., `See Api::V2::NewService`).
- Instructions on what to do if this code is still needed.

**Example for a TypeScript module:**

```ts
// ############################################################################
// DEPRECATED: This module is no longer in use as of YYYY-MM-DD.
//
// Reason: The old agent config format was replaced by the new schema.
//
// Replacement: Use `src/types/agent.ts` and the DynamoDB-backed config.
//
// Please do not use this module for new development.
// ############################################################################
```

### 2. Rename the File and Class

To prevent accidental usage and make it clear the code is deprecated, rename both the file and the class it contains.

- **Prefix the filename** with `_deprecated_`.
- **Prefix the class name** with `Deprecated`.

**Example:**
- `src/legacy/agentConfig.ts` becomes `src/legacy/_deprecated_agentConfig.ts`

### 3. Move to a `deprecated` Directory (Optional - Best Practice)

For better organization, especially in large-scale deprecations, consider moving deprecated files into a `deprecated` subdirectory within their domain.

**Example:**
- Move `_deprecated_end_service.rb` from `app/services/coach_bookings/` to `app/services/coach_bookings/deprecated/`.

This keeps the primary directories clean and focused on active code.

### 4. Update References

Search the codebase for any remaining calls to the old code and update them to use the new implementation. This step is critical to ensure the application functions correctly after the deprecation.

### 5. Remove from Routes (If applicable)

If you are deprecating a route or API handler, remove the corresponding route from the frontend/router or backend entrypoint to prevent use.

---

By following this process, we maintain a clean and understandable codebase, making it easier for developers to identify and avoid using outdated components. 