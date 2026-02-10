/**
 * RBAC Context
 * Provides permission-based access control throughout the app
 */

import { createContext, useContext, ReactNode } from 'react';
import { Permission, Action, RBACContextType } from '@/types/rbac';
import { rbacService } from '@/services/rbac/rbacService';
import { ROUTE_PERMISSIONS } from '@/config/permissions';
import { useAuth } from './AuthContext';

const RBACContext = createContext<RBACContextType | null>(null);

export function RBACProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // Permissions come directly from backend via user object
  const permissions = user?.permissions || [];

  const hasPermission = (feature: string, action: Action): boolean => {
    return rbacService.hasPermission(permissions, feature, action);
  };

  const checkPermission = (permission: Permission): boolean => {
    return rbacService.checkPermission(permissions, permission);
  };

  const hasAnyPermission = (requiredPermissions: Permission[]): boolean => {
    return rbacService.hasAnyPermission(permissions, requiredPermissions);
  };

  const hasAllPermissions = (requiredPermissions: Permission[]): boolean => {
    return rbacService.hasAllPermissions(permissions, requiredPermissions);
  };

  const canAccess = (path: string): boolean => {
    return rbacService.canAccessRoute(permissions, path, ROUTE_PERMISSIONS);
  };

  return (
    <RBACContext.Provider
      value={{
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        canAccess,
        permissions,
        checkPermission,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within RBACProvider');
  }
  return context;
}
