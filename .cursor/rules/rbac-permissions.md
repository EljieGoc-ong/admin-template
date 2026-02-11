# RBAC & Permission System Rules

## Overview
This project uses Role-Based Access Control (RBAC) with a flexible permission system for controlling access to features and routes.

## Core Concepts
- **Roles**: User roles (e.g., admin, editor, viewer)
- **Permissions**: Granular access rights (e.g., 'users:read', 'users:write')
- **Guards**: Components that enforce permission checks

## Key Files
- `src/contexts/RBACContext.tsx` - RBAC context provider
- `src/contexts/AuthContext.tsx` - Authentication context
- `src/hooks/usePermission.tsx` - Permission checking hook
- `src/components/guards/` - Permission guard components
- `src/config/permissions.ts` - Permission definitions

## Permission Check Pattern
**ALWAYS** check permissions before rendering protected UI:

```typescript
import { usePermission } from '@/hooks/usePermission';

export const UserManagement = () => {
  const canViewUsers = usePermission('users:read');
  const canEditUsers = usePermission('users:write');

  if (!canViewUsers) {
    return <AccessDenied />;
  }

  return (
    <div>
      <UserList />
      {canEditUsers && <CreateUserButton />}
    </div>
  );
};
```

## Route Protection
Use `ProtectedRoute` component for route-level protection:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route
  path="/admin"
  element={
    <ProtectedRoute requiredPermission="admin:access">
      <AdminPage />
    </ProtectedRoute>
  }
/>
```

## Navigation with RBAC
Use `NavigationWithRBAC` for permission-aware navigation:

```typescript
import { NavigationWithRBAC } from '@/components/NavigationWithRBAC';

const navItems = [
  {
    label: 'Users',
    path: '/users',
    requiredPermission: 'users:read',
  },
  {
    label: 'Admin',
    path: '/admin',
    requiredPermission: 'admin:access',
  },
];

<NavigationWithRBAC items={navItems} />
```

## Permission Guards
```typescript
import { PermissionGuard } from '@/components/guards/PermissionGuard';

<PermissionGuard permission="users:delete">
  <DeleteUserButton />
</PermissionGuard>
```

## Defining New Permissions
Add permissions to `src/config/permissions.ts`:

```typescript
export const PERMISSIONS = {
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',
  ADMIN_ACCESS: 'admin:access',
} as const;
```

## RBAC Rules
1. **ALWAYS** check permissions before rendering protected UI
2. **ALWAYS** use the `usePermission` hook for permission checks
3. **ALWAYS** follow existing RBAC patterns in `contexts/RBACContext.tsx`
4. **ALWAYS** document required permissions for new features
5. **NEVER** skip permission checks for "admin-only" features
6. **NEVER** implement permission logic directly in components - use hooks/context

## Testing Permissions
```typescript
import { RBACProvider } from '@/contexts/RBACContext';

const mockPermissions = ['users:read', 'users:write'];

render(
  <RBACProvider permissions={mockPermissions}>
    <UserManagement />
  </RBACProvider>
);
```

## Reference
See `docs/PERMISSION_BASED_RBAC.md` for complete documentation.
