# Database Standards (DynamoDB + Terraform)

## Table Design
- Use clear, stable primary keys (e.g., `agent_id`).
- Prefer `PAY_PER_REQUEST` for low/unknown traffic.
- Add GSIs only when required by query patterns.

## Naming
- Table names: `<project>-<domain>` or a clear domain name (e.g., `ai-voice-agents`).
- Attribute names: `snake_case`.

## Terraform
- Define tables in Terraform only.
- Keep schema changes backward compatible.

## AI Agent Rules
1. **ALWAYS** define DynamoDB tables in Terraform.
2. **ALWAYS** document key schema and GSIs.
3. **NEVER** change primary keys without a migration plan.
