/**
 * Unit Tests for AdminService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { adminService } from '@/services/admin/adminService';

describe('AdminService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return array of users', async () => {
      const users = await adminService.getUsers();

      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('name');
      expect(users[0]).toHaveProperty('email');
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const users = await adminService.getUsers();
      const firstUserId = users[0].id;

      const user = await adminService.getUserById(firstUserId);

      expect(user).not.toBeNull();
      expect(user?.id).toBe(firstUserId);
    });

    it('should return null for non-existent user', async () => {
      const user = await adminService.getUserById('non-existent-id');

      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create new user with provided data', async () => {
      const userData = {
        name: 'New User',
        email: 'newuser@example.com',
        status: 'active' as const,
        role: 'user' as const,
        lastActive: '2024-01-01',
        lastLogin: '2024-01-01',
      };

      const createdUser = await adminService.createUser(userData);

      expect(createdUser).toHaveProperty('id');
      expect(createdUser).toHaveProperty('createdAt');
      expect(createdUser.name).toBe(userData.name);
      expect(createdUser.email).toBe(userData.email);
      expect(createdUser.status).toBe(userData.status);
      expect(createdUser.role).toBe(userData.role);
    });

    it('should generate unique id for new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        status: 'active' as const,
        role: 'user' as const,
        lastActive: '2024-01-01',
        lastLogin: '2024-01-01',
      };

      const user1 = await adminService.createUser(userData);
      
      // Wait a bit to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const user2 = await adminService.createUser(userData);

      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('updateUser', () => {
    it('should update user with provided data', async () => {
      const users = await adminService.getUsers();
      const userId = users[0].id;
      const updates = {
        name: 'Updated Name',
        status: 'inactive' as const,
      };

      const updatedUser = await adminService.updateUser(userId, updates);

      expect(updatedUser.id).toBe(userId);
      expect(updatedUser.name).toBe(updates.name);
      expect(updatedUser.status).toBe(updates.status);
    });

    it('should throw error for non-existent user', async () => {
      const updates = { name: 'Updated Name' };

      await expect(async () => {
        await adminService.updateUser('non-existent-id', updates);
      }).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete user without error', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await expect(adminService.deleteUser('user-123')).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith('User deleted:', 'user-123');
      consoleSpy.mockRestore();
    });
  });

  describe('getSystemMetrics', () => {
    it('should return array of system metrics', async () => {
      const metrics = await adminService.getSystemMetrics();

      expect(Array.isArray(metrics)).toBe(true);
      expect(metrics.length).toBeGreaterThan(0);
      expect(metrics[0]).toHaveProperty('label');
      expect(metrics[0]).toHaveProperty('value');
      expect(metrics[0]).toHaveProperty('trend');
    });

    it('should return metrics with expected structure', async () => {
      const metrics = await adminService.getSystemMetrics();

      metrics.forEach(metric => {
        expect(typeof metric.label).toBe('string');
        expect(typeof metric.value).toBe('string');
        expect(typeof metric.trend).toBe('string');
        // Note: change property might be optional depending on the mock data
        if (metric.change !== undefined) {
          expect(typeof metric.change).toBe('string');
        }
      });
    });
  });

  describe('getActivityLogs', () => {
    it('should return array of activity logs', async () => {
      const logs = await adminService.getActivityLogs();

      expect(Array.isArray(logs)).toBe(true);
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0]).toHaveProperty('id');
      expect(logs[0]).toHaveProperty('user');
      expect(logs[0]).toHaveProperty('action');
      expect(logs[0]).toHaveProperty('status');
    });

    it('should filter logs by status', async () => {
      const logs = await adminService.getActivityLogs({ status: 'success' });

      expect(logs.every(log => log.status === 'success')).toBe(true);
    });

    it('should return all logs when status is "all"', async () => {
      const allLogs = await adminService.getActivityLogs({ status: 'all' });
      const unfiltered = await adminService.getActivityLogs();

      expect(allLogs.length).toBe(unfiltered.length);
    });

    it('should limit number of logs returned', async () => {
      const limit = 5;
      const logs = await adminService.getActivityLogs({ limit });

      expect(logs.length).toBeLessThanOrEqual(limit);
    });

    it('should handle multiple filters', async () => {
      const logs = await adminService.getActivityLogs({
        status: 'success',
        limit: 3,
      });

      expect(logs.length).toBeLessThanOrEqual(3);
      expect(logs.every(log => log.status === 'success')).toBe(true);
    });
  });

  describe('exportActivityLogs', () => {
    it('should export logs as CSV', async () => {
      const blob = await adminService.exportActivityLogs('csv');

      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/csv');

      // NOSONAR: typescript:S7756 - jsdom test environment doesn't support blob.text() yet
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(blob);
      });
      expect(text).toContain('ID,User,Action,Resource,Timestamp,Status');
    });

    it('should export logs as JSON', async () => {
      const blob = await adminService.exportActivityLogs('json');

      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('application/json');

      // NOSONAR: typescript:S7756 - jsdom test environment doesn't support blob.text() yet
      const text = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(blob);
      });
      const parsed = JSON.parse(text);
      expect(Array.isArray(parsed)).toBe(true);
    });

    it('should default to CSV format', async () => {
      const blob = await adminService.exportActivityLogs();

      expect(blob.type).toBe('text/csv');
    });
  });

  describe('clearCache', () => {
    it('should clear cache without error', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await expect(adminService.clearCache()).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith('Cache cleared');
      consoleSpy.mockRestore();
    });
  });

  describe('restartServices', () => {
    it('should restart services without error', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await expect(adminService.restartServices()).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith('Services restarted');
      consoleSpy.mockRestore();
    });
  });

  describe('runDiagnostics', () => {
    it('should return diagnostics result', async () => {
      const result = await adminService.runDiagnostics();

      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('checks');
      expect(Array.isArray(result.checks)).toBe(true);
    });

    it('should return checks with expected structure', async () => {
      const result = await adminService.runDiagnostics();

      result.checks.forEach(check => {
        expect(check).toHaveProperty('name');
        expect(check).toHaveProperty('passed');
        expect(typeof check.name).toBe('string');
        expect(typeof check.passed).toBe('boolean');
      });
    });

    it('should return healthy status', async () => {
      const result = await adminService.runDiagnostics();

      expect(result.status).toBe('healthy');
      expect(result.checks.every(check => check.passed)).toBe(true);
    });
  });

  describe('backupDatabase', () => {
    it('should create backup and return backup info', async () => {
      const result = await adminService.backupDatabase();

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('backupId');
      expect(typeof result.message).toBe('string');
      expect(typeof result.backupId).toBe('string');
    });

    it('should generate unique backup id', async () => {
      const result1 = await adminService.backupDatabase();
      
      // Wait longer to ensure different timestamp (backup takes 3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3100));
      
      const result2 = await adminService.backupDatabase();

      expect(result1.backupId).not.toBe(result2.backupId);
    }, 10000); // Increase timeout to 10 seconds
  });

  describe('updateSystemSettings', () => {
    it('should update settings without error', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const settings = {
        maintenanceMode: true,
        notifications: false,
      };

      await expect(adminService.updateSystemSettings(settings)).resolves.not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith('Settings updated:', settings);
      consoleSpy.mockRestore();
    });
  });

  describe('getSystemSettings', () => {
    it('should return system settings', async () => {
      const settings = await adminService.getSystemSettings();

      expect(settings).toHaveProperty('maintenanceMode');
      expect(settings).toHaveProperty('notifications');
      expect(settings).toHaveProperty('autoBackup');
      expect(settings).toHaveProperty('twoFactorAuth');
      expect(settings).toHaveProperty('sessionTimeout');
      expect(settings).toHaveProperty('maxLoginAttempts');
      expect(settings).toHaveProperty('alertEmail');
      expect(settings).toHaveProperty('alertFrequency');
    });

    it('should return settings with correct types', async () => {
      const settings = await adminService.getSystemSettings();

      expect(typeof settings.maintenanceMode).toBe('boolean');
      expect(typeof settings.notifications).toBe('boolean');
      expect(typeof settings.autoBackup).toBe('boolean');
      expect(typeof settings.twoFactorAuth).toBe('boolean');
      expect(typeof settings.sessionTimeout).toBe('number');
      expect(typeof settings.maxLoginAttempts).toBe('number');
      expect(typeof settings.alertEmail).toBe('string');
      expect(typeof settings.alertFrequency).toBe('string');
    });
  });
});
