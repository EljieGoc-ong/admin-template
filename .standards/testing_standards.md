# Testing Standards (Frontend + Infra)

## Frontend
- Prefer component tests for UI behavior.
- Cover critical utilities with unit tests.
- Keep tests deterministic and avoid network calls.

## Infrastructure
- Run `terraform validate` on all changes.
- Prefer `terraform plan` before apply.

## AI Agent Rules
1. **ALWAYS** add tests for critical UI logic.
2. **ALWAYS** run lint and validation checks.
