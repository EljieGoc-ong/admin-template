# TypeScript & React Code Style Rules

## TypeScript Conventions
1. **ALWAYS** use `import type` for type-only imports
2. **ALWAYS** use explicit types - avoid `any` without strong justification
3. **NEVER** use `any` type - prefer explicit types or `unknown`
4. Use proper TypeScript types for GraphQL responses
5. Define types in `src/types/` directory

### Example - Type-Only Imports
```typescript
// ✅ GOOD
import type { User } from '@/types/rbac';
import { useAuth } from '@/contexts/AuthContext';

// ❌ BAD
import { User } from '@/types/rbac'; // User is only used as type
```

## React Conventions
1. **ALWAYS** use functional components with hooks
2. **ALWAYS** keep components small, focused, and reusable
3. **NEVER** create overly complex nested components
4. Keep effects minimal and well-scoped
5. Avoid derived state; compute from props when possible
6. Use `useMemo` and `useCallback` only when actually needed for performance

### Example - Functional Component
```typescript
// ✅ GOOD
import type { FC } from 'react';

interface UserProfileProps {
  userId: string;
  onUpdate?: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({ userId, onUpdate }) => {
  // Component logic here
  return <div>User Profile</div>;
};
```

## Naming Conventions
- **Components**: `PascalCase` (e.g., `UserProfile.tsx`)
- **Hooks**: `useSomething` (e.g., `usePermission.tsx`)
- **Component Files**: `PascalCase.tsx`
- **Utility Files**: `camelCase.ts`
- **Services**: `camelCase.ts` in appropriate service folders
- **Types/Interfaces**: `PascalCase` (e.g., `User`, `PermissionConfig`)

## File Organization
```
src/
  components/
    UserProfile.tsx       # Component
    ui/                   # shadcn/ui components
  hooks/
    usePermission.tsx     # Custom hook
  services/
    auth/
      authService.ts      # Service logic
  types/
    rbac.ts              # Type definitions
  utils/
    formatters.ts        # Utility functions
```

## State and Effects
- Keep `useEffect` hooks minimal and focused on one concern
- Clean up effects properly (return cleanup function)
- Avoid unnecessary re-renders by computing values from props
- Use proper dependency arrays for effects and callbacks

## Reference
See `.standards/code_style_standards.md` for complete details.
