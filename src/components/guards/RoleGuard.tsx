/**
 * DEPRECATED: RoleGuard Component
 * This component is deprecated. Use PermissionGuard instead.
 * Kept for backward compatibility.
 */

import { ReactNode } from 'react';
import { Permission } from '@/types/rbac';
import { useHasAnyPermission } from '@/hooks/usePermission';

interface RoleGuardProps {
  children: ReactNode;
  permissions: Permission[]; // Use permissions instead of roles
  fallback?: ReactNode;
}

/**
 * @deprecated Use PermissionGuard instead
 */
export function RoleGuard({ children, permissions, fallback = null }: RoleGuardProps) {
  const hasPermission = useHasAnyPermission(permissions);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
