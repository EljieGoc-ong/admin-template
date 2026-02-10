/**
 * GraphQL Fragments
 * Reusable fragments for queries and mutations
 */

import { gql } from '@apollo/client';

/**
 * User Fragments
 */

export const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    email
    name
    createdAt
    updatedAt
  }
`;

export const USER_WITH_PERMISSIONS_FRAGMENT = gql`
  fragment UserWithPermissions on User {
    id
    email
    name
    permissions
    createdAt
    updatedAt
  }
`;

/**
 * Pagination Fragments
 */

export const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

/**
 * Activity Log Fragments
 */

export const ACTIVITY_LOG_FRAGMENT = gql`
  fragment ActivityLogFields on ActivityLog {
    id
    user
    action
    resource
    timestamp
    status
  }
`;

/**
 * Report Fragments
 */

export const REPORT_FRAGMENT = gql`
  fragment ReportFields on Report {
    id
    title
    description
    createdBy
    createdAt
    updatedAt
  }
`;

export const REPORT_WITH_DATA_FRAGMENT = gql`
  fragment ReportWithData on Report {
    id
    title
    description
    data
    createdBy
    createdAt
    updatedAt
  }
`;

/**
 * System Fragments
 */

export const SYSTEM_METRICS_FRAGMENT = gql`
  fragment SystemMetricsFields on SystemMetrics {
    cpuUsage
    memoryUsage
    storageUsage
    apiResponseTime
    serverUptime
    activeSessions
  }
`;

export const SYSTEM_HEALTH_FRAGMENT = gql`
  fragment SystemHealthFields on SystemHealth {
    apiServer
    database
    cdn
    emailService
  }
`;
