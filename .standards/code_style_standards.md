# Code Style Standards (React + TypeScript)

## General
- Prefer functional components and hooks.
- Use `import type` for type-only imports.
- Avoid `any`; use explicit types or `unknown`.
- Keep components focused and small.

## Naming
- Components: `PascalCase`
- Hooks: `useSomething`
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities

## State and Effects
- Keep effects minimal and well-scoped.
- Avoid derived state; compute from props when possible.
- Use `useMemo` and `useCallback` only when needed.

## Styling
- Use Tailwind classes consistently with existing patterns.
- Avoid inline styles unless necessary.

## AI Agent Rules
1. **ALWAYS** use type-only imports when possible.
2. **ALWAYS** keep components small and reusable.
3. **NEVER** introduce `any` without a strong reason.
