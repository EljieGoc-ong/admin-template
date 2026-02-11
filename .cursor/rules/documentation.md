# Documentation Standards & Rules

## General Documentation Rules
1. **ALWAYS** use JSDoc for exported utilities and shared modules
2. **ALWAYS** keep README accurate with current setup steps
3. **ALWAYS** document non-obvious UI state or data transformations
4. **NEVER** leave complex logic undocumented
5. Update relevant docs when changing functionality

## JSDoc for TypeScript
Use JSDoc comments for exported functions and utilities:

```typescript
/**
 * Formats a user's full name for display.
 * @param firstName - The user's first name
 * @param lastName - The user's last name (optional)
 * @returns The formatted full name
 * @example
 * ```typescript
 * formatUserName('John', 'Doe'); // Returns: "John Doe"
 * formatUserName('John'); // Returns: "John"
 * ```
 */
export function formatUserName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}
```

## Interface and Type Documentation
```typescript
/**
 * Represents a user in the system with role-based permissions.
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address (must be unique) */
  email: string;
  /** User's full name */
  name: string;
  /** User's role for permission checks */
  role: UserRole;
  /** User's assigned permissions */
  permissions: string[];
}
```

## Component Documentation
Document complex or shared components:

```typescript
/**
 * A reusable button component with permission-based rendering.
 * Only renders if the user has the required permission.
 * 
 * @example
 * ```tsx
 * <PermissionButton
 *   permission="users:delete"
 *   onClick={handleDelete}
 *   variant="destructive"
 * >
 *   Delete User
 * </PermissionButton>
 * ```
 */
export const PermissionButton: FC<PermissionButtonProps> = ({
  permission,
  children,
  ...buttonProps
}) => {
  const hasPermission = usePermission(permission);
  
  if (!hasPermission) return null;
  
  return <Button {...buttonProps}>{children}</Button>;
};
```

## README Documentation
Keep README.md updated with:
- Project overview and purpose
- Setup instructions
- Available scripts
- Project structure
- Key features
- Environment variables
- Deployment instructions

## API Documentation
Document API endpoints and data contracts:

```typescript
/**
 * User Service API
 * 
 * Handles all user-related operations including CRUD and authentication.
 * 
 * @example
 * ```typescript
 * // Get user by ID
 * const user = await userService.getUser('123');
 * 
 * // Update user
 * await userService.updateUser('123', { name: 'New Name' });
 * ```
 */
export const userService = {
  /**
   * Retrieves a user by their ID.
   * @param id - The user's unique identifier
   * @returns Promise resolving to the user data
   * @throws {ApiError} If user not found or request fails
   */
  async getUser(id: string): Promise<User> {
    // Implementation
  },
};
```

## Inline Comments
Use inline comments for complex logic:

```typescript
// Calculate the user's effective permissions by combining
// role-based permissions with any custom permissions granted
const effectivePermissions = [
  ...rolePermissions[user.role],
  ...user.customPermissions,
].filter((permission, index, self) => 
  // Remove duplicates while preserving order
  self.indexOf(permission) === index
);
```

## Non-Obvious Behavior
Document non-obvious state management or side effects:

```typescript
export const useAuthSync = () => {
  // IMPORTANT: This effect syncs auth state with localStorage
  // and triggers on every auth change to ensure persistence
  // across page refreshes and tabs
  useEffect(() => {
    const syncAuth = () => {
      const authData = getAuthFromStorage();
      if (authData) {
        setAuthState(authData);
      }
    };
    
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);
};
```

## Project Documentation Files
Key documentation locations:
- `README.md` - Main project documentation
- `docs/GRAPHQL_INTEGRATION.md` - GraphQL setup and usage
- `docs/PERMISSION_BASED_RBAC.md` - RBAC system documentation
- `docs/TEST_SUMMARY.md` - Testing guidelines
- `.standards/` - All project standards and conventions

## When to Document
Document when:
- Creating shared utilities or services
- Implementing complex business logic
- Building reusable components
- Adding new features or APIs
- Changing existing behavior
- Making architectural decisions

## What NOT to Document
Skip documentation for:
- Self-explanatory code
- Simple getters/setters
- Obvious variable names
- Standard React patterns
- Trivial helper functions

## Reference
See `.standards/documentation_standards.md` for complete details.
