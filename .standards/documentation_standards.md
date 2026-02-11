# Documentation Standards

## TypeScript Documentation

Use JSDoc on exported utilities and shared modules:

```ts
/**
 * Returns a display label for an agent.
 */
export function agentLabel(name: string, model?: string): string {
  return model ? `${name} · ${model}` : name
}
```

## Frontend Documentation

- Keep README setup steps accurate (`npm install`, `npm run dev`, etc.).
- Document any non-obvious UI state or data transformations.

## Infrastructure Documentation

- Describe Terraform modules/resources in README sections.
- Record required variables and example `tfvars`.

## AI Agent Rules

1. **ALWAYS** document public utilities and shared modules.
2. **ALWAYS** keep README updated with setup instructions.
3. **NEVER** leave complex logic undocumented.
