/**
 * Unit Tests for Permission Helper Functions
 */

import { describe, it, expect } from 'vitest';
import { createPermission, parsePermission, AVAILABLE_PERMISSIONS } from '@/config/permissions';
import { Feature, Action } from '@/types/rbac';

describe('Permission Helpers', () => {
  describe('createPermission', () => {
    it('should create permission string from feature and action', () => {
      const permission = createPermission(Feature.USERS, Action.READ);
      expect(permission).toBe('users:read');
    });

    it('should create permission string with different actions', () => {
      expect(createPermission(Feature.USERS, Action.WRITE)).toBe('users:write');
      expect(createPermission(Feature.REPORTS, Action.READ)).toBe('reports:read');
      expect(createPermission(Feature.SETTINGS, Action.WRITE)).toBe('settings:write');
    });

    it('should handle all features', () => {
      expect(createPermission(Feature.USERS, Action.READ)).toBe('users:read');
      expect(createPermission(Feature.REPORTS, Action.READ)).toBe('reports:read');
      expect(createPermission(Feature.SETTINGS, Action.READ)).toBe('settings:read');
      expect(createPermission(Feature.MONITORING, Action.READ)).toBe('monitoring:read');
      expect(createPermission(Feature.DASHBOARD, Action.READ)).toBe('dashboard:read');
      expect(createPermission(Feature.ACTIVITY_LOGS, Action.READ)).toBe('activity_logs:read');
      expect(createPermission(Feature.SYSTEM, Action.READ)).toBe('system:read');
      expect(createPermission(Feature.ADMINISTRATION, Action.READ)).toBe('administration:read');
    });

    it('should handle custom feature strings', () => {
      const permission = createPermission('custom_feature', Action.READ);
      expect(permission).toBe('custom_feature:read');
    });
  });

  describe('parsePermission', () => {
    it('should parse permission string into feature and action', () => {
      const result = parsePermission('users:read');
      expect(result.feature).toBe('users');
      expect(result.action).toBe('read');
    });

    it('should parse different permissions correctly', () => {
      expect(parsePermission('users:write')).toEqual({
        feature: 'users',
        action: 'write',
      });

      expect(parsePermission('reports:read')).toEqual({
        feature: 'reports',
        action: 'read',
      });

      expect(parsePermission('settings:write')).toEqual({
        feature: 'settings',
        action: 'write',
      });
    });

    it('should handle permissions with underscores', () => {
      const result = parsePermission('activity_logs:read');
      expect(result.feature).toBe('activity_logs');
      expect(result.action).toBe('read');
    });

    it('should handle custom permissions', () => {
      const result = parsePermission('custom_feature:custom_action');
      expect(result.feature).toBe('custom_feature');
      expect(result.action).toBe('custom_action');
    });
  });

  describe('AVAILABLE_PERMISSIONS', () => {
    it('should have all user permissions', () => {
      expect(AVAILABLE_PERMISSIONS.USERS_READ).toBe('users:read');
      expect(AVAILABLE_PERMISSIONS.USERS_WRITE).toBe('users:write');
    });

    it('should have all report permissions', () => {
      expect(AVAILABLE_PERMISSIONS.REPORTS_READ).toBe('reports:read');
      expect(AVAILABLE_PERMISSIONS.REPORTS_WRITE).toBe('reports:write');
    });

    it('should have all settings permissions', () => {
      expect(AVAILABLE_PERMISSIONS.SETTINGS_READ).toBe('settings:read');
      expect(AVAILABLE_PERMISSIONS.SETTINGS_WRITE).toBe('settings:write');
    });

    it('should have all monitoring permissions', () => {
      expect(AVAILABLE_PERMISSIONS.MONITORING_READ).toBe('monitoring:read');
      expect(AVAILABLE_PERMISSIONS.MONITORING_WRITE).toBe('monitoring:write');
    });

    it('should have all dashboard permissions', () => {
      expect(AVAILABLE_PERMISSIONS.DASHBOARD_READ).toBe('dashboard:read');
      expect(AVAILABLE_PERMISSIONS.DASHBOARD_WRITE).toBe('dashboard:write');
    });

    it('should have all activity log permissions', () => {
      expect(AVAILABLE_PERMISSIONS.ACTIVITY_LOGS_READ).toBe('activity_logs:read');
      expect(AVAILABLE_PERMISSIONS.ACTIVITY_LOGS_WRITE).toBe('activity_logs:write');
    });

    it('should have all system permissions', () => {
      expect(AVAILABLE_PERMISSIONS.SYSTEM_READ).toBe('system:read');
      expect(AVAILABLE_PERMISSIONS.SYSTEM_WRITE).toBe('system:write');
    });

    it('should have all administration permissions', () => {
      expect(AVAILABLE_PERMISSIONS.ADMINISTRATION_READ).toBe('administration:read');
      expect(AVAILABLE_PERMISSIONS.ADMINISTRATION_WRITE).toBe('administration:write');
    });

    it('should have permissions in correct format (feature:action)', () => {
      const permissions = Object.values(AVAILABLE_PERMISSIONS);
      
      permissions.forEach(permission => {
        expect(permission).toMatch(/^[a-z_]+:(read|write)$/);
      });
    });

    it('should have unique permission values', () => {
      const permissions = Object.values(AVAILABLE_PERMISSIONS);
      const uniquePermissions = new Set(permissions);
      
      expect(uniquePermissions.size).toBe(permissions.length);
    });
  });

  describe('createPermission and parsePermission integration', () => {
    it('should be inverse operations', () => {
      const originalFeature = Feature.USERS;
      const originalAction = Action.READ;

      const permission = createPermission(originalFeature, originalAction);
      const parsed = parsePermission(permission);

      expect(parsed.feature).toBe(originalFeature);
      expect(parsed.action).toBe(originalAction);
    });

    it('should work with all feature-action combinations', () => {
      const features = Object.values(Feature);
      const actions = Object.values(Action);

      features.forEach(feature => {
        actions.forEach(action => {
          const permission = createPermission(feature, action);
          const parsed = parsePermission(permission);

          expect(parsed.feature).toBe(feature);
          expect(parsed.action).toBe(action);
        });
      });
    });
  });
});
