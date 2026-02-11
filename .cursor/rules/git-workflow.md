# Git Workflow & Version Control Rules

## Commit Message Format
**ALWAYS** use conventional commit format: `type(scope): message`

### Commit Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `style` - Code style/formatting changes

### Examples
```bash
feat(auth): Add email verification functionality
fix(rbac): Correct permission check for admin routes
docs: Update API documentation
refactor(hooks): Simplify usePermission implementation
test(auth): Add tests for login flow
chore(deps): Update dependencies
```

## Branch Naming
**ALWAYS** create feature branches: `type/description`

### Branch Types
```bash
feature/user-profile
feature/user-authentication
bugfix/permission-check
bugfix/payment-calculation
refactor/user-service
docs/api-documentation
chore/update-dependencies
hotfix/critical-security-issue
```

## Development Workflow
```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# 2. Make changes and commit
git add .
git commit -m "feat(auth): Add user authentication"

# 3. Push and create PR
git push origin feature/user-authentication

# 4. Keep branch updated (if needed)
git checkout main
git pull origin main
git checkout feature/user-authentication
git rebase main
```

## Pre-commit Checklist
Before committing, verify:
- [ ] All tests pass
- [ ] Linting passes (ESLint)
- [ ] TypeScript compilation succeeds with no errors
- [ ] No `any` types introduced without justification
- [ ] Relevant documentation updated
- [ ] Git commit follows conventional format
- [ ] No sensitive data or secrets in code
- [ ] Changes are focused and logical

## Pull Request Guidelines
1. **Create PR** with clear description and issue links
2. **Keep PR small** - prefer under 400 lines when possible
3. **Get review** from at least one team member
4. **Address feedback** promptly
5. **Merge** using squash merge
6. **Delete branch** after merge

## AI Agent Rules
1. **ALWAYS** create feature branches from main
2. **ALWAYS** use conventional commit format
3. **ALWAYS** write descriptive commit messages
4. **ALWAYS** run tests before committing
5. **NEVER** commit directly to main/master
6. **NEVER** commit sensitive information (tokens, passwords, keys)
7. **NEVER** mix unrelated changes in one commit
8. Keep branches short-lived (1-2 days maximum)

## Reference
See `.standards/git_workflow_standards.md` for complete details.
