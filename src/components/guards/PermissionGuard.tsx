/**
 * Permission Guard Component
 * Conditionally renders children based on permissions
 */

import { ReactNode } from 'react';
import { Action, Permission } from '@/types/rbac';
import { useRBAC } from '@/contexts/RBACContext';

interface PermissionGuardProps {
  children: ReactNode;
  feature?: string;
  action?: Action;
  permission?: Permission; // exact permission string like "users:write"
  permissions?: Permission[]; // array of permissions
  requireAll?: boolean; // if permissions array, require all or any
  fallback?: ReactNode;
}

export function PermissionGuard({
  children,
  feature,
  action,
  permission,
  permissions,
  requireAll = false,
  fallback = null
}: PermissionGuardProps) {
  const { hasPermission, checkPermission, hasAnyPermission, hasAllPermissions } = useRBAC();

  let hasAccess = false;

  // Check single feature:action
  if (feature && action) {
    hasAccess = hasPermission(feature, action);
  }
  // Check exact permission string
  else if (permission) {
    hasAccess = checkPermission(permission);
  }
  // Check array of permissions
  else if (permissions && permissions.length > 0) {
    hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
