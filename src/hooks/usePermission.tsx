/**
 * Permission Hooks
 * Custom hooks for checking permissions in components
 */

import { Action, Permission } from '@/types/rbac';
import { useRBAC } from '@/contexts/RBACContext';

/**
 * Check if user has a specific permission (feature:action)
 */
export function usePermission(feature: string, action: Action): boolean {
  const { hasPermission } = useRBAC();
  return hasPermission(feature, action);
}

/**
 * Check if user has exact permission string
 */
export function useHasPermission(permission: Permission): boolean {
  const { checkPermission } = useRBAC();
  return checkPermission(permission);
}

/**
 * Check if user can access a route
 */
export function useCanAccess(path: string): boolean {
  const { canAccess } = useRBAC();
  return canAccess(path);
}

/**
 * Get all user permissions
 */
export function usePermissions(): Permission[] {
  const { permissions } = useRBAC();
  return permissions;
}

/**
 * Check if user has ANY of the specified permissions
 */
export function useHasAnyPermission(permissions: Permission[]): boolean {
  const { hasAnyPermission } = useRBAC();
  return hasAnyPermission(permissions);
}

/**
 * Check if user has ALL of the specified permissions
 */
export function useHasAllPermissions(permissions: Permission[]): boolean {
  const { hasAllPermissions } = useRBAC();
  return hasAllPermissions(permissions);
}

/**
 * Check if user can write to a feature
 */
export function useCanWrite(feature: string): boolean {
  return usePermission(feature, Action.WRITE);
}

/**
 * Check if user can read a feature
 */
export function useCanRead(feature: string): boolean {
  return usePermission(feature, Action.READ);
}

/**
 * Check if user has admin permissions (write access to critical features)
 */
export function useIsAdmin(): boolean {
  const { hasAnyPermission } = useRBAC();
  return hasAnyPermission(['users:write', 'settings:write', 'administration:read']);
}
