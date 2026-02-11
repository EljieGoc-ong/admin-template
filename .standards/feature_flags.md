# Feature Flags (React + Backend)

## Frontend
- Use `import.meta.env` for build-time flags.
- Prefix frontend flags with `VITE_`.

## Backend
- Use environment variables (e.g., `FEATURE_X=true`).
- Keep defaults conservative in production.

## AI Agent Rules
1. **ALWAYS** document new flags in README or config docs.
2. **NEVER** hardcode behavior without a flag for risky changes.
