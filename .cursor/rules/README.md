# Cursor Rules Directory

This directory contains organized AI rules for Cursor IDE. Each file focuses on a specific aspect of the project.

## Rule Files

### Core Rules
- **`project-overview.md`** - Project context, architecture, and standards reference
- **`code-style.md`** - TypeScript and React coding conventions
- **`documentation.md`** - JSDoc and documentation standards

### Development Rules
- **`api.md`** - API design, response formats, and HTTP conventions
- **`git-workflow.md`** - Git commits, branching, and PR guidelines
- **`testing.md`** - Testing standards and patterns

### Feature-Specific Rules
- **`rbac-permissions.md`** - Role-based access control patterns
- **`graphql.md`** - GraphQL integration with Apollo Client
- **`styling.md`** - Tailwind CSS and shadcn/ui conventions

## How Cursor Uses These Rules

Cursor automatically:
1. ✅ Picks up all `.md` files in `.cursor/rules/`
2. ✅ Applies them to AI chat context
3. ✅ Shows them in **Settings > Rules**
4. ✅ References them when generating code

## Referencing Rules in Chat

You can explicitly reference rules using `@` mentions:

```
@code-style help me create a new React component
@rbac-permissions show me how to add permission checks
@graphql create a query for user data
```

## Rule Priority

Both `.cursorrules` (root file) and `.cursor/rules/` (directory) work together:
- Root `.cursorrules` file provides high-level project rules
- `.cursor/rules/` directory provides detailed, organized rules
- Cursor merges them automatically

## Updating Rules

When updating rules:
1. Edit the relevant `.md` file
2. Save changes
3. Restart Cursor chat (or restart Cursor IDE)
4. Rules will be automatically applied

## Detailed Standards

For even more detailed standards, see the `.standards/` directory:
- `.standards/code_style_standards.md`
- `.standards/api_standards.md`
- `.standards/git_workflow_standards.md`
- `.standards/testing_standards.md`
- And more...

## Troubleshooting

If rules aren't being applied:
1. Check **Settings > Rules** to verify files are detected
2. Start a fresh chat session (context degradation in long chats)
3. Explicitly mention rules with `@rule-filename`
4. Restart Cursor IDE completely

## Testing Rules

To verify rules are working, ask Cursor:
- "What are the code style standards for this project?"
- "How should I structure my Git commits?"
- "What permission checks should I add?"

If Cursor references these rules, they're working correctly! ✅
