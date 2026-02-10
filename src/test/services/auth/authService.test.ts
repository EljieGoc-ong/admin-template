/**
 * Unit Tests for AuthService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '@/services/auth/authService';
import type { LoginCredentials, SignupCredentials } from '@/services/auth/authService';
import { storageService } from '@/services/storage/storageService';

// Mock storage service
vi.mock('@/services/storage/storageService', () => ({
  storageService: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

// Mock validation service
vi.mock('@/services/validation/validationService', () => ({
  validationService: {
    isValidEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    isValidPassword: (password: string, minLength = 6) => password && password.length >= minLength,
    isStrongPassword: (password: string) => {
      if (!password) return false;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      return hasUpperCase && hasLowerCase && hasNumbers && password.length >= 8;
    },
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validateLoginCredentials', () => {
    it('should return null for valid credentials', () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };
      const error = authService.validateLoginCredentials(credentials);
      expect(error).toBeNull();
    });

    it('should return error when email is missing', () => {
      const credentials: LoginCredentials = {
        email: '',
        password: 'password123',
      };
      const error = authService.validateLoginCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Please fill in all fields.');
    });

    it('should return error when password is missing', () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: '',
      };
      const error = authService.validateLoginCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Please fill in all fields.');
    });

    it('should return error for invalid email format', () => {
      const credentials: LoginCredentials = {
        email: 'invalid-email',
        password: 'password123',
      };
      const error = authService.validateLoginCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Please enter a valid email address.');
      expect(error?.field).toBe('email');
    });

    it('should return error for password shorter than minimum length', () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: '12345',
      };
      const error = authService.validateLoginCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Password must be at least 6 characters.');
      expect(error?.field).toBe('password');
    });
  });

  describe('validateSignupCredentials', () => {
    it('should return null for valid strong credentials', () => {
      const credentials: SignupCredentials = {
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
      };
      const error = authService.validateSignupCredentials(credentials);
      expect(error).toBeNull();
    });

    it('should return error when email is missing', () => {
      const credentials: SignupCredentials = {
        email: '',
        password: 'Password123',
      };
      const error = authService.validateSignupCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Please fill in all fields.');
    });

    it('should return error when password is missing', () => {
      const credentials: SignupCredentials = {
        email: 'test@example.com',
        password: '',
      };
      const error = authService.validateSignupCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Please fill in all fields.');
    });

    it('should return error for invalid email format', () => {
      const credentials: SignupCredentials = {
        email: 'invalid-email',
        password: 'Password123',
      };
      const error = authService.validateSignupCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Please enter a valid email address.');
      expect(error?.field).toBe('email');
    });

    it('should return error for password shorter than minimum length', () => {
      const credentials: SignupCredentials = {
        email: 'test@example.com',
        password: '12345',
      };
      const error = authService.validateSignupCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Password must be at least 6 characters.');
      expect(error?.field).toBe('password');
    });

    it('should return error for weak password', () => {
      const credentials: SignupCredentials = {
        email: 'test@example.com',
        password: 'password',
      };
      const error = authService.validateSignupCredentials(credentials);
      expect(error).not.toBeNull();
      expect(error?.message).toBe('Password should contain uppercase, lowercase, and numbers.');
      expect(error?.field).toBe('password');
    });
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await authService.login(credentials);

      expect(response.token).toBeDefined();
      expect(response.user.email).toBe(credentials.email);
      expect(response.user.permissions).toBeDefined();
      expect(Array.isArray(response.user.permissions)).toBe(true);
    });

    it('should throw error for invalid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'invalid-email',
        password: 'password123',
      };

      await expect(authService.login(credentials)).rejects.toThrow();
    });

    it('should assign super admin permissions for super/root email', async () => {
      const credentials: LoginCredentials = {
        email: 'super@example.com',
        password: 'password123',
      };

      const response = await authService.login(credentials);

      expect(response.user.permissions).toContain('users:read');
      expect(response.user.permissions).toContain('users:write');
      expect(response.user.permissions).toContain('administration:read');
      expect(response.user.permissions).toContain('administration:write');
      expect(response.user.permissions.length).toBeGreaterThan(10);
    });

    it('should assign admin permissions for admin email', async () => {
      const credentials: LoginCredentials = {
        email: 'admin@example.com',
        password: 'password123',
      };

      const response = await authService.login(credentials);

      expect(response.user.permissions).toContain('users:read');
      expect(response.user.permissions).toContain('users:write');
      expect(response.user.permissions).toContain('administration:read');
      expect(response.user.permissions).not.toContain('administration:write');
    });

    it('should assign manager permissions for manager email', async () => {
      const credentials: LoginCredentials = {
        email: 'manager@example.com',
        password: 'password123',
      };

      const response = await authService.login(credentials);

      expect(response.user.permissions).toContain('users:read');
      expect(response.user.permissions).toContain('reports:read');
      expect(response.user.permissions).not.toContain('users:write');
      expect(response.user.permissions).not.toContain('settings:write');
    });

    it('should assign viewer permissions for viewer email', async () => {
      const credentials: LoginCredentials = {
        email: 'viewer@example.com',
        password: 'password123',
      };

      const response = await authService.login(credentials);

      expect(response.user.permissions).toEqual(['dashboard:read']);
    });

    it('should assign default permissions for regular user', async () => {
      const credentials: LoginCredentials = {
        email: 'user@example.com',
        password: 'password123',
      };

      const response = await authService.login(credentials);

      expect(response.user.permissions).toContain('dashboard:read');
      expect(response.user.permissions).toContain('reports:read');
      expect(response.user.permissions.length).toBe(2);
    });

    it('should store auth data after login', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      };

      await authService.login(credentials);

      expect(storageService.setItem).toHaveBeenCalled();
    });
  });

  describe('signup', () => {
    it('should successfully signup with valid credentials', async () => {
      const credentials: SignupCredentials = {
        email: 'newuser@example.com',
        password: 'Password123',
        name: 'New User',
      };

      const response = await authService.signup(credentials);

      expect(response.token).toBeDefined();
      expect(response.user.email).toBe(credentials.email);
      expect(response.user.name).toBe(credentials.name);
      expect(response.user.permissions).toEqual(['dashboard:read', 'reports:read']);
    });

    it('should throw error for invalid credentials', async () => {
      const credentials: SignupCredentials = {
        email: 'invalid-email',
        password: 'Password123',
      };

      await expect(authService.signup(credentials)).rejects.toThrow();
    });

    it('should use email username as name if name not provided', async () => {
      const credentials: SignupCredentials = {
        email: 'john.doe@example.com',
        password: 'Password123',
      };

      const response = await authService.signup(credentials);

      expect(response.user.name).toBe('john.doe');
    });

    it('should store auth data after signup', async () => {
      const credentials: SignupCredentials = {
        email: 'newuser@example.com',
        password: 'Password123',
      };

      await authService.signup(credentials);

      expect(storageService.setItem).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should remove auth data from both storages', async () => {
      await authService.logout();

      expect(storageService.removeItem).toHaveBeenCalledTimes(4);
      expect(storageService.removeItem).toHaveBeenCalledWith('auth_token', localStorage);
      expect(storageService.removeItem).toHaveBeenCalledWith('auth_user', localStorage);
      expect(storageService.removeItem).toHaveBeenCalledWith('auth_token', sessionStorage);
      expect(storageService.removeItem).toHaveBeenCalledWith('auth_user', sessionStorage);
    });
  });

  describe('getCurrentUser', () => {
    it('should return user from localStorage', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        permissions: ['dashboard:read'],
      };
      vi.mocked(storageService.getItem).mockReturnValue(JSON.stringify(mockUser));

      const user = authService.getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('should return user from sessionStorage if not in localStorage', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        permissions: ['dashboard:read'],
      };
      vi.mocked(storageService.getItem)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(JSON.stringify(mockUser));

      const user = authService.getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it('should return null if no user in storage', () => {
      vi.mocked(storageService.getItem).mockReturnValue(null);

      const user = authService.getCurrentUser();

      expect(user).toBeNull();
    });

    it('should return null for invalid JSON', () => {
      vi.mocked(storageService.getItem).mockReturnValue('invalid-json');

      const user = authService.getCurrentUser();

      expect(user).toBeNull();
    });
  });

  describe('getAuthToken', () => {
    it('should return token from localStorage', () => {
      vi.mocked(storageService.getItem).mockReturnValue('mock_token');

      const token = authService.getAuthToken();

      expect(token).toBe('mock_token');
    });

    it('should return token from sessionStorage if not in localStorage', () => {
      vi.mocked(storageService.getItem)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce('mock_token');

      const token = authService.getAuthToken();

      expect(token).toBe('mock_token');
    });

    it('should return null if no token in storage', () => {
      vi.mocked(storageService.getItem).mockReturnValue(null);

      const token = authService.getAuthToken();

      expect(token).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      vi.mocked(storageService.getItem).mockReturnValue('mock_token');

      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false when token does not exist', () => {
      vi.mocked(storageService.getItem).mockReturnValue(null);

      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('refreshToken', () => {
    it('should return a new token', async () => {
      const newToken = await authService.refreshToken();

      expect(newToken).toBeDefined();
      expect(typeof newToken).toBe('string');
      expect(newToken).toContain('mock_refreshed_token_');
    });
  });

  describe('requestPasswordReset', () => {
    it('should successfully request password reset for valid email', async () => {
      await expect(authService.requestPasswordReset('test@example.com')).resolves.not.toThrow();
    });

    it('should throw error for invalid email', async () => {
      await expect(authService.requestPasswordReset('invalid-email')).rejects.toThrow(
        'Please enter a valid email address.'
      );
    });
  });

  describe('resetPassword', () => {
    it('should successfully reset password with valid token and password', async () => {
      await expect(
        authService.resetPassword('valid_token', 'newPassword123')
      ).resolves.not.toThrow();
    });

    it('should throw error for invalid password', async () => {
      await expect(authService.resetPassword('valid_token', '123')).rejects.toThrow(
        'Password must be at least 6 characters.'
      );
    });
  });
});
