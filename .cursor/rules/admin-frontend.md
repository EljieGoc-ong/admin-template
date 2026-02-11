---
description: Frontend React rules and UI guidance
globs: frontend/src/**/*.{ts,tsx}
alwaysApply: false
---
Follow React best practices from the Vercel rule set in `.cursor/rules/react-best-practices`.

Additional project guidance:
- Prefer functional components and hooks.
- Use `import type` for type-only imports to avoid runtime export errors.
- Keep UI styling consistent with existing Tailwind class usage in the repo.