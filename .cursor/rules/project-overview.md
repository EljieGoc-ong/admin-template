# Project Overview - Admin Template

## About This Project
This is a React + TypeScript admin template with:
- GraphQL integration via Apollo Client
- Role-Based Access Control (RBAC) with permission system
- Modern UI components using Tailwind CSS and shadcn/ui
- Vitest for testing
- Bun/npm for package management

## Architecture
- **Frontend**: React 18+ with TypeScript
- **State Management**: React Context (AuthContext, RBACContext)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui components
- **Data Fetching**: Apollo Client for GraphQL
- **Build Tool**: Vite

## Key Directories
- `src/components/` - Reusable UI components
- `src/pages/` - Route-level page components
- `src/contexts/` - React Context providers
- `src/hooks/` - Custom React hooks
- `src/services/` - Business logic and API clients
- `src/types/` - TypeScript type definitions
- `.standards/` - Detailed project standards and conventions

## Standards Reference
All detailed standards are in `.standards/` directory:
- `.standards/code_style_standards.md` - TypeScript/React conventions
- `.standards/api_standards.md` - HTTP handlers, responses, authentication
- `.standards/documentation_standards.md` - JSDoc, README guidelines
- `.standards/testing_standards.md` - Frontend/unit testing guidance
- `.standards/git_workflow_standards.md` - Commits, branches, PRs
- `.standards/database_standards.md` - Schema and data modeling
- `.standards/model_design_standards.md` - Type definitions
- `.standards/feature_flags.md` - Feature flag patterns
- `.standards/ai_standards.md` - AI agent guidelines

## When Making Changes
1. Read relevant standards from `.standards/` directory first
2. Follow established patterns in existing codebase
3. Cite which standards were applied
4. Explain any necessary deviations from standards
5. Run verification commands after generating code
