/**
 * GraphQL Queries
 * Define all GraphQL queries here
 */

import { gql } from '@apollo/client';

/**
 * Authentication Queries
 */

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      email
      name
      permissions
    }
  }
`;

export const GET_USER_PERMISSIONS = gql`
  query GetUserPermissions {
    me {
      id
      permissions
    }
  }
`;

/**
 * Users Queries
 */

export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int, $search: String) {
    users(limit: $limit, offset: $offset, search: $search) {
      nodes {
        id
        email
        name
        createdAt
        updatedAt
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      email
      name
      permissions
      createdAt
      updatedAt
    }
  }
`;

/**
 * Activity Logs Queries
 */

export const GET_ACTIVITY_LOGS = gql`
  query GetActivityLogs(
    $limit: Int
    $offset: Int
    $status: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    activityLogs(
      limit: $limit
      offset: $offset
      status: $status
      startDate: $startDate
      endDate: $endDate
    ) {
      nodes {
        id
        user
        action
        resource
        timestamp
        status
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

/**
 * System Queries
 */

export const GET_SYSTEM_METRICS = gql`
  query GetSystemMetrics {
    systemMetrics {
      cpuUsage
      memoryUsage
      storageUsage
      apiResponseTime
      serverUptime
      activeSessions
    }
  }
`;

export const GET_SYSTEM_HEALTH = gql`
  query GetSystemHealth {
    systemHealth {
      apiServer
      database
      cdn
      emailService
    }
  }
`;

/**
 * Reports Queries
 */

export const GET_REPORTS = gql`
  query GetReports($limit: Int, $offset: Int) {
    reports(limit: $limit, offset: $offset) {
      nodes {
        id
        title
        description
        createdBy
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;

export const GET_REPORT_BY_ID = gql`
  query GetReportById($id: ID!) {
    report(id: $id) {
      id
      title
      description
      data
      createdBy
      createdAt
      updatedAt
    }
  }
`;

/**
 * Settings Queries
 */

export const GET_SYSTEM_SETTINGS = gql`
  query GetSystemSettings {
    systemSettings {
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
