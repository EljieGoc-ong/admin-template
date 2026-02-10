/**
 * Unit Tests for RBACService
 */

import { describe, it, expect } from 'vitest';
import { rbacService } from '@/services/rbac/rbacService';
import { Permission, Action } from '@/types/rbac';

describe('RBACService', () => {
  const mockUserPermissions: Permission[] = [
    'users:read',
    'users:write',
    'reports:read',
    'dashboard:read',
    'dashboard:write',
  ];

  describe('hasPermission', () => {
    it('should return true when user has the specific permission', () => {
      expect(rbacService.hasPermission(mockUserPermissions, 'users', Action.READ)).toBe(true);
      expect(rbacService.hasPermission(mockUserPermissions, 'users', Action.WRITE)).toBe(true);
      expect(rbacService.hasPermission(mockUserPermissions, 'reports', Action.READ)).toBe(true);
    });

    it('should return false when user does not have the permission', () => {
      expect(rbacService.hasPermission(mockUserPermissions, 'reports', Action.WRITE)).toBe(false);
      expect(rbacService.hasPermission(mockUserPermissions, 'settings', Action.READ)).toBe(false);
      expect(rbacService.hasPermission(mockUserPermissions, 'admin', Action.WRITE)).toBe(false);
    });

    it('should handle empty permissions array', () => {
      expect(rbacService.hasPermission([], 'users', Action.READ)).toBe(false);
    });
  });

  describe('checkPermission', () => {
    it('should return true when user has the exact permission', () => {
      expect(rbacService.checkPermission(mockUserPermissions, 'users:read')).toBe(true);
      expect(rbacService.checkPermission(mockUserPermissions, 'dashboard:write')).toBe(true);
    });

    it('should return false when user does not have the permission', () => {
      expect(rbacService.checkPermission(mockUserPermissions, 'settings:read')).toBe(false);
      expect(rbacService.checkPermission(mockUserPermissions, 'users:delete')).toBe(false);
    });
  });

  describe('hasAnyPermission', () => {
    it('should return true when user has at least one of the required permissions', () => {
      expect(rbacService.hasAnyPermission(mockUserPermissions, ['users:read', 'settings:read'])).toBe(true);
      expect(rbacService.hasAnyPermission(mockUserPermissions, ['admin:write', 'reports:read'])).toBe(true);
    });

    it('should return false when user has none of the required permissions', () => {
      expect(rbacService.hasAnyPermission(mockUserPermissions, ['settings:read', 'admin:write'])).toBe(false);
    });

    it('should handle empty required permissions array', () => {
      expect(rbacService.hasAnyPermission(mockUserPermissions, [])).toBe(false);
    });
  });

  describe('hasAllPermissions', () => {
    it('should return true when user has all required permissions', () => {
      expect(rbacService.hasAllPermissions(mockUserPermissions, ['users:read', 'reports:read'])).toBe(true);
      expect(rbacService.hasAllPermissions(mockUserPermissions, ['dashboard:read', 'dashboard:write'])).toBe(true);
    });

    it('should return false when user is missing any required permission', () => {
      expect(rbacService.hasAllPermissions(mockUserPermissions, ['users:read', 'settings:read'])).toBe(false);
      expect(rbacService.hasAllPermissions(mockUserPermissions, ['reports:read', 'reports:write'])).toBe(false);
    });

    it('should handle empty required permissions array', () => {
      expect(rbacService.hasAllPermissions(mockUserPermissions, [])).toBe(true);
    });
  });

  describe('canAccessRoute', () => {
    const routePermissions = {
      '/users': {
        requiredPermissions: ['users:read'],
      },
      '/admin': {
        requiredPermissions: ['admin:read', 'admin:write'],
        requireAll: true,
      },
      '/dashboard': {
        requiredPermissions: ['dashboard:read', 'reports:read'],
        requireAll: false,
      },
    };

    it('should allow access when user has required permissions (any)', () => {
      expect(rbacService.canAccessRoute(mockUserPermissions, '/users', routePermissions)).toBe(true);
      expect(rbacService.canAccessRoute(mockUserPermissions, '/dashboard', routePermissions)).toBe(true);
    });

    it('should deny access when user lacks required permissions', () => {
      expect(rbacService.canAccessRoute(mockUserPermissions, '/admin', routePermissions)).toBe(false);
    });

    it('should allow access to routes without restrictions', () => {
      expect(rbacService.canAccessRoute(mockUserPermissions, '/public', routePermissions)).toBe(true);
    });

    it('should handle requireAll flag correctly', () => {
      const strictRoute = {
        '/strict': {
          requiredPermissions: ['users:read', 'users:write'],
          requireAll: true,
        },
      };
      expect(rbacService.canAccessRoute(mockUserPermissions, '/strict', strictRoute)).toBe(true);

      const partialPermissions: Permission[] = ['users:read', 'reports:read'];
      expect(rbacService.canAccessRoute(partialPermissions, '/strict', strictRoute)).toBe(false);
    });
  });

  describe('getUserFeatures', () => {
    it('should return unique features from user permissions', () => {
      const features = rbacService.getUserFeatures(mockUserPermissions);
      expect(features).toContain('users');
      expect(features).toContain('reports');
      expect(features).toContain('dashboard');
      expect(features).toHaveLength(3);
    });

    it('should handle empty permissions array', () => {
      const features = rbacService.getUserFeatures([]);
      expect(features).toHaveLength(0);
    });

    it('should deduplicate features', () => {
      const permissions: Permission[] = ['users:read', 'users:write', 'users:delete'];
      const features = rbacService.getUserFeatures(permissions);
      expect(features).toEqual(['users']);
    });
  });

  describe('getFeatureActions', () => {
    it('should return all actions for a specific feature', () => {
      const actions = rbacService.getFeatureActions(mockUserPermissions, 'users');
      expect(actions).toContain(Action.READ);
      expect(actions).toContain(Action.WRITE);
      expect(actions).toHaveLength(2);
    });

    it('should return empty array for features user does not have', () => {
      const actions = rbacService.getFeatureActions(mockUserPermissions, 'settings');
      expect(actions).toHaveLength(0);
    });

    it('should handle single action features', () => {
      const actions = rbacService.getFeatureActions(mockUserPermissions, 'reports');
      expect(actions).toEqual([Action.READ]);
    });
  });

  describe('canWrite', () => {
    it('should return true when user has write permission', () => {
      expect(rbacService.canWrite(mockUserPermissions, 'users')).toBe(true);
      expect(rbacService.canWrite(mockUserPermissions, 'dashboard')).toBe(true);
    });

    it('should return false when user does not have write permission', () => {
      expect(rbacService.canWrite(mockUserPermissions, 'reports')).toBe(false);
      expect(rbacService.canWrite(mockUserPermissions, 'settings')).toBe(false);
    });
  });

  describe('canRead', () => {
    it('should return true when user has read permission', () => {
      expect(rbacService.canRead(mockUserPermissions, 'users')).toBe(true);
      expect(rbacService.canRead(mockUserPermissions, 'reports')).toBe(true);
      expect(rbacService.canRead(mockUserPermissions, 'dashboard')).toBe(true);
    });

    it('should return false when user does not have read permission', () => {
      expect(rbacService.canRead(mockUserPermissions, 'settings')).toBe(false);
      expect(rbacService.canRead(mockUserPermissions, 'admin')).toBe(false);
    });
  });

  describe('filterByWritePermission', () => {
    const items = [
      { id: 1, feature: 'users', name: 'User 1' },
      { id: 2, feature: 'reports', name: 'Report 1' },
      { id: 3, feature: 'dashboard', name: 'Dashboard 1' },
      { id: 4, name: 'No Feature' }, // No feature property
    ];

    it('should filter items by write permissions', () => {
      const filtered = rbacService.filterByWritePermission(mockUserPermissions, items);
      expect(filtered).toHaveLength(3); // users, dashboard, and the item without feature
      expect(filtered.find(item => item.feature === 'users')).toBeDefined();
      expect(filtered.find(item => item.feature === 'dashboard')).toBeDefined();
      expect(filtered.find(item => item.id === 4)).toBeDefined(); // Item without feature
    });

    it('should include items without feature property', () => {
      const filtered = rbacService.filterByWritePermission(mockUserPermissions, items);
      expect(filtered.find(item => item.id === 4)).toBeDefined();
    });

    it('should return empty array when no items have write permission', () => {
      const readOnlyPermissions: Permission[] = ['reports:read'];
      const filtered = rbacService.filterByWritePermission(readOnlyPermissions, items);
      expect(filtered).toHaveLength(1); // Only the item without feature
    });
  });

  describe('getVisibleElements', () => {
    const elements = [
      {
        key: 'user-button',
        requiredPermissions: ['users:read'] as Permission[],
      },
      {
        key: 'admin-panel',
        requiredPermissions: ['admin:read', 'admin:write'] as Permission[],
        requireAll: true,
      },
      {
        key: 'dashboard-widget',
        requiredPermissions: ['dashboard:read', 'reports:read'] as Permission[],
        requireAll: false,
      },
    ];

    it('should return visible elements based on permissions', () => {
      const visible = rbacService.getVisibleElements(mockUserPermissions, elements);
      expect(visible).toContain('user-button');
      expect(visible).toContain('dashboard-widget');
      expect(visible).not.toContain('admin-panel');
    });

    it('should handle requireAll flag correctly', () => {
      const adminPermissions: Permission[] = ['admin:read', 'admin:write'];
      const visible = rbacService.getVisibleElements(adminPermissions, elements);
      expect(visible).toContain('admin-panel');
    });

    it('should return empty array when no elements are visible', () => {
      const visible = rbacService.getVisibleElements([], elements);
      expect(visible).toHaveLength(0);
    });
  });

  describe('validatePermissions', () => {
    it('should validate correct permission format', () => {
      const result = rbacService.validatePermissions(['users:read', 'reports:write']);
      expect(result.valid).toBe(true);
      expect(result.invalidPermissions).toHaveLength(0);
    });

    it('should detect permissions without colon', () => {
      const result = rbacService.validatePermissions(['users_read', 'reports:write']);
      expect(result.valid).toBe(false);
      expect(result.invalidPermissions).toContain('users_read');
    });

    it('should detect permissions with invalid action', () => {
      const result = rbacService.validatePermissions(['users:delete', 'reports:read']);
      expect(result.valid).toBe(false);
      expect(result.invalidPermissions).toContain('users:delete');
    });

    it('should detect permissions with missing parts', () => {
      const result = rbacService.validatePermissions(['users:', ':read', 'reports:write']);
      expect(result.valid).toBe(false);
      expect(result.invalidPermissions).toContain('users:');
      expect(result.invalidPermissions).toContain(':read');
    });

    it('should handle empty permissions array', () => {
      const result = rbacService.validatePermissions([]);
      expect(result.valid).toBe(true);
      expect(result.invalidPermissions).toHaveLength(0);
    });
  });

  describe('getPermissionLabel', () => {
    it('should format permission labels correctly', () => {
      expect(rbacService.getPermissionLabel('users:read')).toBe('Users - Read');
      expect(rbacService.getPermissionLabel('activity_logs:write')).toBe('Activity Logs - Write');
      expect(rbacService.getPermissionLabel('system:read')).toBe('System - Read');
    });

    it('should handle multi-word features', () => {
      expect(rbacService.getPermissionLabel('user_management:write')).toBe('User Management - Write');
    });
  });

  describe('groupPermissionsByFeature', () => {
    it('should group permissions by feature', () => {
      const grouped = rbacService.groupPermissionsByFeature(mockUserPermissions);
      expect(grouped['users']).toEqual([Action.READ, Action.WRITE]);
      expect(grouped['reports']).toEqual([Action.READ]);
      expect(grouped['dashboard']).toEqual([Action.READ, Action.WRITE]);
    });

    it('should handle empty permissions array', () => {
      const grouped = rbacService.groupPermissionsByFeature([]);
      expect(Object.keys(grouped)).toHaveLength(0);
    });

    it('should handle single permission per feature', () => {
      const permissions: Permission[] = ['users:read', 'reports:read', 'settings:read'];
      const grouped = rbacService.groupPermissionsByFeature(permissions);
      expect(grouped['users']).toEqual([Action.READ]);
      expect(grouped['reports']).toEqual([Action.READ]);
      expect(grouped['settings']).toEqual([Action.READ]);
    });
  });

  describe('hasAdminAccess', () => {
    it('should return true when user has admin permissions', () => {
      const adminPermissions: Permission[] = ['users:write', 'settings:write', 'administration:read'];
      expect(rbacService.hasAdminAccess(adminPermissions)).toBe(true);
    });

    it('should return true when user has at least one admin permission', () => {
      const partialAdmin: Permission[] = ['users:write', 'reports:read'];
      expect(rbacService.hasAdminAccess(partialAdmin)).toBe(true);
    });

    it('should return false when user has no admin permissions', () => {
      const regularUser: Permission[] = ['reports:read', 'dashboard:read'];
      expect(rbacService.hasAdminAccess(regularUser)).toBe(false);
    });

    it('should handle empty permissions array', () => {
      expect(rbacService.hasAdminAccess([])).toBe(false);
    });
  });

  describe('isReadOnly', () => {
    it('should return true when user has only read permission', () => {
      expect(rbacService.isReadOnly(mockUserPermissions, 'reports')).toBe(true);
    });

    it('should return false when user has write permission', () => {
      expect(rbacService.isReadOnly(mockUserPermissions, 'users')).toBe(false);
      expect(rbacService.isReadOnly(mockUserPermissions, 'dashboard')).toBe(false);
    });

    it('should return false when user has no read permission', () => {
      expect(rbacService.isReadOnly(mockUserPermissions, 'settings')).toBe(false);
    });

    it('should handle features with neither read nor write', () => {
      const noPermissions: Permission[] = ['other:read'];
      expect(rbacService.isReadOnly(noPermissions, 'users')).toBe(false);
    });
  });
});
