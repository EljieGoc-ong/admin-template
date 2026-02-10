/**
 * Authentication Service
 * Handles all authentication-related business logic
 */

import { storageService } from '../storage/storageService';
import { validationService } from '../validation/validationService';
import { apiClient } from '../api/apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    permissions: string[]; // Array of "feature:action" strings from backend
  };
}

export interface AuthError {
  message: string;
  field?: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  /**
   * Validate login credentials
   */
  validateLoginCredentials(credentials: LoginCredentials): AuthError | null {
    const { email, password } = credentials;

    if (!email || !password) {
      return { message: 'Please fill in all fields.' };
    }

    if (!validationService.isValidEmail(email)) {
      return { message: 'Please enter a valid email address.', field: 'email' };
    }

    if (!validationService.isValidPassword(password)) {
      return { 
        message: 'Password must be at least 6 characters.', 
        field: 'password' 
      };
    }

    return null;
  }

  /**
   * Validate signup credentials
   */
  validateSignupCredentials(credentials: SignupCredentials): AuthError | null {
    const { email, password } = credentials;

    if (!email || !password) {
      return { message: 'Please fill in all fields.' };
    }

    if (!validationService.isValidEmail(email)) {
      return { message: 'Please enter a valid email address.', field: 'email' };
    }

    if (!validationService.isValidPassword(password)) {
      return { 
        message: 'Password must be at least 6 characters.', 
        field: 'password' 
      };
    }

    if (!validationService.isStrongPassword(password)) {
      return {
        message: 'Password should contain uppercase, lowercase, and numbers.',
        field: 'password'
      };
    }

    return null;
  }

  /**
   * Login user
   * Backend should return user with permissions array
   * 
   * BACKEND RESPONSE FORMAT:
   * {
   *   token: "jwt_token",
   *   user: {
   *     id: "user_id",
   *     email: "user@example.com",
   *     name: "User Name",
   *     permissions: ["users:read", "users:write", "reports:read", ...]
   *   }
   * }
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validate credentials
    const validationError = this.validateLoginCredentials(credentials);
    if (validationError) {
      throw new Error(validationError.message);
    }

    // In production, make API call:
    // const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    // Backend returns user with permissions array
    // return response;

    // Mock implementation - assign different permission sets based on email
    return new Promise((resolve) => {
      setTimeout(() => {
        let permissions: string[] = [];
        
        // Mock permission assignment based on email
        if (credentials.email.includes('super') || credentials.email.includes('root')) {
          // Super admin - all permissions
          permissions = [
            'users:read', 'users:write',
            'reports:read', 'reports:write',
            'settings:read', 'settings:write',
            'monitoring:read', 'monitoring:write',
            'dashboard:read', 'dashboard:write',
            'activity_logs:read', 'activity_logs:write',
            'system:read', 'system:write',
            'administration:read', 'administration:write'
          ];
        } else if (credentials.email.includes('admin')) {
          // Admin - most permissions
          permissions = [
            'users:read', 'users:write',
            'reports:read', 'reports:write',
            'settings:read', 'settings:write',
            'monitoring:read',
            'dashboard:read',
            'activity_logs:read',
            'administration:read'
          ];
        } else if (credentials.email.includes('manager')) {
          // Manager - limited permissions
          permissions = [
            'users:read',
            'reports:read', 'reports:write',
            'dashboard:read',
            'monitoring:read'
          ];
        } else if (credentials.email.includes('viewer')) {
          // Viewer - read only
          permissions = [
            'dashboard:read'
          ];
        } else {
          // Default user permissions
          permissions = [
            'dashboard:read',
            'reports:read'
          ];
        }

        const mockResponse: AuthResponse = {
          token: 'mock_jwt_token_' + Date.now(),
          user: {
            id: '1',
            email: credentials.email,
            name: credentials.email.split('@')[0],
            permissions: permissions,
          },
        };

        // Store auth data
        this.storeAuthData(mockResponse, credentials.rememberMe);
        resolve(mockResponse);
      }, 800);
    });
  }

  /**
   * Sign up new user
   * Backend should return user with default permissions
   */
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    // Validate credentials
    const validationError = this.validateSignupCredentials(credentials);
    if (validationError) {
      throw new Error(validationError.message);
    }

    // In production:
    // const response = await apiClient.post<AuthResponse>('/auth/signup', credentials);
    // return response;

    // Mock implementation - new users get basic permissions
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'mock_jwt_token_' + Date.now(),
          user: {
            id: '2',
            email: credentials.email,
            name: credentials.name || credentials.email.split('@')[0],
            permissions: [
              'dashboard:read',
              'reports:read'
            ],
          },
        };

        // Store auth data
        this.storeAuthData(mockResponse, false);
        resolve(mockResponse);
      }, 800);
    });
  }

  /**
   * Store authentication data
   */
  private storeAuthData(authResponse: AuthResponse, rememberMe?: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storageService.setItem(this.TOKEN_KEY, authResponse.token, storage);
    storageService.setItem(this.USER_KEY, JSON.stringify(authResponse.user), storage);
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // In production, you might want to invalidate the token on the server
    // await apiClient.post('/auth/logout');

    // Clear local storage
    storageService.removeItem(this.TOKEN_KEY, localStorage);
    storageService.removeItem(this.USER_KEY, localStorage);
    storageService.removeItem(this.TOKEN_KEY, sessionStorage);
    storageService.removeItem(this.USER_KEY, sessionStorage);
  }

  /**
   * Get current user from storage
   */
  getCurrentUser(): AuthResponse['user'] | null {
    const userStr = storageService.getItem(this.USER_KEY, localStorage) || 
                   storageService.getItem(this.USER_KEY, sessionStorage);
    
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Get current auth token
   */
  getAuthToken(): string | null {
    return storageService.getItem(this.TOKEN_KEY, localStorage) || 
           storageService.getItem(this.TOKEN_KEY, sessionStorage);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getAuthToken() !== null;
  }

  /**
   * Refresh auth token
   */
  async refreshToken(): Promise<string> {
    // In production:
    // const response = await apiClient.post<{ token: string }>('/auth/refresh');
    // return response.token;

    // Mock implementation
    return 'mock_refreshed_token_' + Date.now();
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    if (!validationService.isValidEmail(email)) {
      throw new Error('Please enter a valid email address.');
    }

    // In production:
    // await apiClient.post('/auth/password-reset', { email });

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Password reset email sent to:', email);
        resolve();
      }, 1000);
    });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    if (!validationService.isValidPassword(newPassword)) {
      throw new Error('Password must be at least 6 characters.');
    }

    // In production:
    // await apiClient.post('/auth/password-reset/confirm', { token, password: newPassword });

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Password reset successful');
        resolve();
      }, 1000);
    });
  }
}

export const authService = new AuthService();
