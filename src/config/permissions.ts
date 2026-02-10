/**
 * Permissions Configuration
 * Define all available permissions and route requirements
 */

import { Permission, Feature, Action, RoutePermission } from '@/types/rbac';

/**
 * Permission Helper - Create permission string
 */
export const createPermission = (feature: Feature | string, action: Action): Permission => {
  return `${feature}:${action}`;
};

/**
 * Parse permission string
 */
export const parsePermission = (permission: Permission): { feature: string; action: string } => {
  const [feature, action] = permission.split(':');
  return { feature, action };
};

/**
 * All Available Permissions in the System
 * This is a reference list - actual permissions come from backend
 */
export const AVAILABLE_PERMISSIONS = {
  // Users
  USERS_READ: createPermission(Feature.USERS, Action.READ),
  USERS_WRITE: createPermission(Feature.USERS, Action.WRITE),
  
  // Reports
  REPORTS_READ: createPermission(Feature.REPORTS, Action.READ),
  REPORTS_WRITE: createPermission(Feature.REPORTS, Action.WRITE),
  
  // Settings
  SETTINGS_READ: createPermission(Feature.SETTINGS, Action.READ),
  SETTINGS_WRITE: createPermission(Feature.SETTINGS, Action.WRITE),
  
  // Monitoring
  MONITORING_READ: createPermission(Feature.MONITORING, Action.READ),
  MONITORING_WRITE: createPermission(Feature.MONITORING, Action.WRITE),
  
  // Dashboard
  DASHBOARD_READ: createPermission(Feature.DASHBOARD, Action.READ),
  DASHBOARD_WRITE: createPermission(Feature.DASHBOARD, Action.WRITE),
  
  // Activity Logs
  ACTIVITY_LOGS_READ: createPermission(Feature.ACTIVITY_LOGS, Action.READ),
  ACTIVITY_LOGS_WRITE: createPermission(Feature.ACTIVITY_LOGS, Action.WRITE),
  
  // System
  SYSTEM_READ: createPermission(Feature.SYSTEM, Action.READ),
  SYSTEM_WRITE: createPermission(Feature.SYSTEM, Action.WRITE),
  
  // Administration
  ADMINISTRATION_READ: createPermission(Feature.ADMINISTRATION, Action.READ),
  ADMINISTRATION_WRITE: createPermission(Feature.ADMINISTRATION, Action.WRITE),
} as const;

/**
 * Route Protection Configuration
 * Define which permissions are needed for each route
 */
export const ROUTE_PERMISSIONS: Record<string, RoutePermission> = {
  '/': {
    path: '/',
    requiredPermissions: [AVAILABLE_PERMISSIONS.DASHBOARD_READ],
  },
  '/users': {
    path: '/users',
    requiredPermissions: [AVAILABLE_PERMISSIONS.USERS_READ],
  },
  '/reports': {
    path: '/reports',
    requiredPermissions: [AVAILABLE_PERMISSIONS.REPORTS_READ],
  },
  '/monitoring': {
    path: '/monitoring',
    requiredPermissions: [AVAILABLE_PERMISSIONS.MONITORING_READ],
  },
  '/settings': {
    path: '/settings',
    requiredPermissions: [AVAILABLE_PERMISSIONS.SETTINGS_READ],
  },
  '/admin': {
    path: '/admin',
    requiredPermissions: [AVAILABLE_PERMISSIONS.ADMINISTRATION_READ],
  },
};

/**
 * Navigation Items with Required Permissions
 */
export interface NavigationItem {
  title: string;
  url: string;
  requiredPermissions: Permission[];
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    requiredPermissions: [AVAILABLE_PERMISSIONS.DASHBOARD_READ],
  },
  {
    title: 'Users',
    url: '/users',
    requiredPermissions: [AVAILABLE_PERMISSIONS.USERS_READ],
  },
  {
    title: 'Reports',
    url: '/reports',
    requiredPermissions: [AVAILABLE_PERMISSIONS.REPORTS_READ],
  },
  {
    title: 'Monitoring',
    url: '/monitoring',
    requiredPermissions: [AVAILABLE_PERMISSIONS.MONITORING_READ],
  },
  {
    title: 'Settings',
    url: '/settings',
    requiredPermissions: [AVAILABLE_PERMISSIONS.SETTINGS_READ],
  },
  {
    title: 'Administration',
    url: '/admin',
    requiredPermissions: [AVAILABLE_PERMISSIONS.ADMINISTRATION_READ],
  },
];

/**
 * Example Permission Sets (for reference/testing)
 * In production, these come from backend based on user's role/assignments
 */
export const EXAMPLE_PERMISSION_SETS = {
  // Super Admin - all permissions
  SUPER_ADMIN: Object.values(AVAILABLE_PERMISSIONS),
  
  // Admin - most permissions except critical system operations
  ADMIN: [
    AVAILABLE_PERMISSIONS.DASHBOARD_READ,
    AVAILABLE_PERMISSIONS.USERS_READ,
    AVAILABLE_PERMISSIONS.USERS_WRITE,
    AVAILABLE_PERMISSIONS.REPORTS_READ,
    AVAILABLE_PERMISSIONS.REPORTS_WRITE,
    AVAILABLE_PERMISSIONS.SETTINGS_READ,
    AVAILABLE_PERMISSIONS.SETTINGS_WRITE,
    AVAILABLE_PERMISSIONS.MONITORING_READ,
    AVAILABLE_PERMISSIONS.ACTIVITY_LOGS_READ,
    AVAILABLE_PERMISSIONS.ADMINISTRATION_READ,
  ],
  
  // Manager - user and report management
  MANAGER: [
    AVAILABLE_PERMISSIONS.DASHBOARD_READ,
    AVAILABLE_PERMISSIONS.USERS_READ,
    AVAILABLE_PERMISSIONS.REPORTS_READ,
    AVAILABLE_PERMISSIONS.REPORTS_WRITE,
    AVAILABLE_PERMISSIONS.MONITORING_READ,
  ],
  
  // User - basic read access
  USER: [
    AVAILABLE_PERMISSIONS.DASHBOARD_READ,
    AVAILABLE_PERMISSIONS.REPORTS_READ,
  ],
  
  // Viewer - read-only
  VIEWER: [
    AVAILABLE_PERMISSIONS.DASHBOARD_READ,
  ],
};
