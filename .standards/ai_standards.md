# AI Standards for AI Agents

## Purpose

The `.standards` directory provides project conventions, patterns, and best practices for AI tools to understand project context and generate compliant code.

## Using Standards with AI

```bash
# Reference standards in prompts
"Review this API handler against .standards/api_standards.md"

"Update frontend code to follow .standards/code_style_standards.md"

"Validate infra changes against .standards/documentation_standards.md"
```

## Standards Structure

```markdown
## Section Heading
### Description
Brief explanation of the standard

### Required Patterns
- Pattern 1
- Pattern 2

### Example - Good Practice
```typescript
// ✅ RECOMMENDED:
// Good example code
```

### Example - Bad Practice

```typescript
// ❌ AVOID:
// Bad example code
```

```

## AI Agent Rules
1. **ALWAYS** reference relevant standards before coding
2. **ALWAYS** follow the patterns in standards files
3. **ALWAYS** use the provided code examples as templates
4. **ALWAYS** cite which standards were applied
5. **ALWAYS** explain any deviations from standards
6. **NEVER** ignore project-specific patterns
7. **NEVER** generate code without checking standards
8. **NEVER** skip error handling patterns
9. **NEVER** exceed size limits specified in standards
10. Run verification commands after generating code

## Effective Prompts
```

Please create a new service object for user registration following
.standards/service_object_standards.md section "Required Structure".

The service should:

1. Validate user parameters
2. Create user record
3. Send welcome email
4. Return success/failure result

Follow error handling patterns from section "Error Handling".

```

## Standards Files Reference
- **API**: `api_standards.md` - HTTP handlers, responses, auth
- **Code**: `code_style_standards.md` - TypeScript/React conventions
- **Database**: `database_standards.md` - DynamoDB schema guidance
- **Models**: `model_design_standards.md` - Type definitions and data shapes
- **Testing**: `testing_standards.md` - Frontend/unit testing guidance
- **Git**: `git_workflow_standards.md` - Commits, branches, PRs
- **Documentation**: `documentation_standards.md` - README/API docs
