/**
 * Services Barrel Export
 * Central export point for all services
 */

// API
export { apiClient } from './api/apiClient';

// Auth
export { authService } from './auth/authService';
export type { LoginCredentials, SignupCredentials, AuthResponse, AuthError } from './auth/authService';

// Validation
export { validationService } from './validation/validationService';

// Storage
export { storageService } from './storage/storageService';

// Admin
export { adminService } from './admin/adminService';

// RBAC
export { rbacService } from './rbac/rbacService';

// GraphQL
export { graphqlService } from './graphql/graphqlService';
export * from './graphql/queries';
export * from './graphql/mutations';
export * from './graphql/fragments';
