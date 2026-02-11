---
description: Refer to this rule when you're in need of adding feature flags
alwaysApply: false
---
# Feature Flags

**Reference**: See `.standards/feature_flags.md` for complete feature flags standards.

## Quick Reference

### Frontend

- Use `import.meta.env` for build-time flags.
- Prefix frontend flags with `VITE_`.

### Backend

- Use environment variables (e.g., `FEATURE_X=true`).
- Keep defaults conservative in production.

## AI Agent Rules

1. **ALWAYS** document new flags in README or config docs.
2. **NEVER** hardcode risky behavior without a flag.
