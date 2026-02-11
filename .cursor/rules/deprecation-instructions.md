---
description: Use this when there is a need to deprecate files
alwaysApply: false
---
# Deprecation Instructions

**Reference**: See `.standards/deprecation_instructions.md` for complete deprecation standards.

## Quick Reference

### When to Deprecate

- Code replaced by new implementation
- No longer used by application
- Kept for backward compatibility but will be removed

### Deprecation Process

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

### File Naming

- **Filename**: Prefix with `_deprecated_` (e.g., `_deprecated_agentConfig.ts`)
- **Directory**: Move to `deprecated/` subdirectory when possible

### Required Actions

1. Add deprecation notice at top of file
2. Rename file and class with `_deprecated_` and `Deprecated` prefixes
3. Update all references to use new implementation
4. Remove from routes if applicable (frontend router or backend entrypoint)
5. Check for any remaining usage in codebase

## AI Agent Rules

1. **ALWAYS** check for deprecated files before using similar functionality
2. **ALWAYS** use the replacement implementation instead of deprecated code
3. **ALWAYS** follow the deprecation process when marking code as deprecated
4. **NEVER** create new code that depends on deprecated functionality
5. **NEVER** skip the deprecation notice when deprecating files
description: Use when we're trying to improve code, and there's a need to deprecate certain files.
alwaysApply: false
