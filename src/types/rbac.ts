/**
 * RBAC Type Definitions
 * Permission-Based Access Control types
 */

// Permission string format: "feature:action"
// Examples: "users:read", "users:write", "reports:write", "settings:read"
export type Permission = string;

// Permission Actions
export enum Action {
  READ = 'read',
  WRITE = 'write'
}

// Features/Resources in the system
export enum Feature {
  USERS = 'users',
  REPORTS = 'reports',
  SETTINGS = 'settings',
  MONITORING = 'monitoring',
  DASHBOARD = 'dashboard',
  ACTIVITY_LOGS = 'activity_logs',
  SYSTEM = 'system',
  ADMINISTRATION = 'administration'
}

// User with Permissions (returned from backend)
export interface UserWithPermissions {
  id: string;
  email: string;
  name: string;
  permissions: Permission[]; // Array of strings like ["users:read", "users:write", "reports:read"]
}

// Permission Check Result
export interface PermissionCheck {
  feature: string;
  action: string;
  granted: boolean;
}

// RBAC Context Type
export interface RBACContextType {
  hasPermission: (feature: string, action: Action) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canAccess: (path: string) => boolean;
  permissions: Permission[];
  checkPermission: (permission: Permission) => boolean;
}

// Route Permission Configuration
export interface RoutePermission {
  path: string;
  requiredPermissions: Permission[]; // At least one permission required
  requireAll?: boolean; // If true, all permissions required
}
