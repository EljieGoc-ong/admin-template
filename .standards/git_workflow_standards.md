# Git Workflow Standards for AI Agents

## Branch Naming
```bash
# Format: type/description
feature/user-authentication
bugfix/payment-calculation
refactor/user-service
docs/api-documentation
chore/update-dependencies
hotfix/critical-security-issue
```

## Commit Messages
```bash
# Format: type(scope): message
feat(auth): Add email verification functionality
fix(payment): Correct tax calculation for international payments
docs: Update API documentation for subscription endpoints
refactor(user): Simplify user service implementation
test(auth): Add tests for password reset flow

# With body
feat(auth): Add multi-factor authentication

Implement time-based one-time password (TOTP) as a second factor for
authentication. This addresses security requirements specified in
project requirements.

Closes #456
```

## Branch Workflow
```bash
# Create feature branch
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# Make changes and commit
git add .
git commit -m "feat(auth): Add user authentication"

# Push and create PR
git push origin feature/user-authentication
# Create PR on GitHub/GitLab

# Keep branch updated
git checkout main
git pull origin main
git checkout feature/user-authentication
git rebase main
```

## Pull Request Process
1. **Create PR** with description, issue links, testing steps
2. **Keep PR small** (< 400 lines when possible)
3. **Get review** from at least one team member
4. **Address feedback** promptly
5. **Merge** with squash merge
6. **Delete branch** after merge

## Pre-commit Checklist
- [ ] All tests pass (project-appropriate)
- [ ] Lint/format checks pass
- [ ] No sensitive data in commits
- [ ] Commit message follows convention
- [ ] Changes are focused and logical

## AI Agent Rules
1. **ALWAYS** create feature branches from main
2. **ALWAYS** use conventional commit format
3. **ALWAYS** write descriptive commit messages
4. **ALWAYS** run tests before committing
5. **ALWAYS** create PRs for main branch changes
6. **ALWAYS** keep branches short-lived (1-2 days)
7. **NEVER** commit directly to main
8. **NEVER** commit sensitive information
9. **NEVER** mix unrelated changes in one commit
10. **NEVER** skip code reviews