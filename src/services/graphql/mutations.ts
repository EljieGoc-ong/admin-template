/**
 * GraphQL Mutations
 * Define all GraphQL mutations here
 */

import { gql } from '@apollo/client';

/**
 * Authentication Mutations
 */

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
        name
        permissions
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $name: String) {
    signup(input: { email: $email, password: $password, name: $name }) {
      token
      user {
        id
        email
        name
        permissions
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
    }
  }
`;

/**
 * Users Mutations
 */

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      name
      permissions
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      name
      permissions
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;

export const UPDATE_USER_PERMISSIONS = gql`
  mutation UpdateUserPermissions($userId: ID!, $permissions: [String!]!) {
    updateUserPermissions(userId: $userId, permissions: $permissions) {
      id
      permissions
    }
  }
`;

/**
 * Reports Mutations
 */

export const CREATE_REPORT = gql`
  mutation CreateReport($input: CreateReportInput!) {
    createReport(input: $input) {
      id
      title
      description
      createdAt
    }
  }
`;

export const UPDATE_REPORT = gql`
  mutation UpdateReport($id: ID!, $input: UpdateReportInput!) {
    updateReport(id: $id, input: $input) {
      id
      title
      description
      updatedAt
    }
  }
`;

export const DELETE_REPORT = gql`
  mutation DeleteReport($id: ID!) {
    deleteReport(id: $id) {
      success
      message
    }
  }
`;

/**
 * System Mutations
 */

export const UPDATE_SYSTEM_SETTINGS = gql`
  mutation UpdateSystemSettings($input: SystemSettingsInput!) {
    updateSystemSettings(input: $input) {
      maintenanceMode
      notifications
      autoBackup
      twoFactorAuth
      sessionTimeout
      maxLoginAttempts
      alertEmail
      alertFrequency
    }
  }
`;

export const CLEAR_CACHE = gql`
  mutation ClearCache {
    clearCache {
      success
      message
    }
  }
`;

export const RESTART_SERVICES = gql`
  mutation RestartServices {
    restartServices {
      success
      message
    }
  }
`;

export const RUN_DIAGNOSTICS = gql`
  mutation RunDiagnostics {
    runDiagnostics {
      status
      checks {
        name
        passed
        message
      }
    }
  }
`;

export const BACKUP_DATABASE = gql`
  mutation BackupDatabase {
    backupDatabase {
      success
      backupId
      message
    }
  }
`;

/**
 * Activity Logs Mutations
 */

export const EXPORT_ACTIVITY_LOGS = gql`
  mutation ExportActivityLogs($format: String!, $filters: ActivityLogFilters) {
    exportActivityLogs(format: $format, filters: $filters) {
      url
      expiresAt
    }
  }
`;
