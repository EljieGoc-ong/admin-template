/**
 * Custom GraphQL Hooks
 * Convenient hooks for using GraphQL in components
 */

import { useQuery, useMutation, useSubscription, useLazyQuery } from '@apollo/client';
import { DocumentNode, OperationVariables } from '@apollo/client';
import { useCallback } from 'react';
import { graphqlService } from '@/services';

/**
 * Custom query hook with error handling
 */
export function useGraphQLQuery<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: {
    variables?: TVariables;
    skip?: boolean;
    pollInterval?: number;
    onCompleted?: (data: TData) => void;
    onError?: (error: Error) => void;
  }
) {
  return useQuery<TData, TVariables>(query, {
    ...options,
    errorPolicy: 'all',
  });
}

/**
 * Custom mutation hook with error handling
 */
export function useGraphQLMutation<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: {
    onCompleted?: (data: TData) => void;
    onError?: (error: Error) => void;
    refetchQueries?: string[] | DocumentNode[];
    awaitRefetchQueries?: boolean;
  }
) {
  return useMutation<TData, TVariables>(mutation, {
    ...options,
    errorPolicy: 'all',
  });
}

/**
 * Lazy query hook - execute query manually
 */
export function useGraphQLLazyQuery<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  query: DocumentNode,
  options?: {
    onCompleted?: (data: TData) => void;
    onError?: (error: Error) => void;
  }
) {
  return useLazyQuery<TData, TVariables>(query, {
    ...options,
    errorPolicy: 'all',
  });
}

/**
 * Subscription hook for real-time updates
 */
export function useGraphQLSubscription<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
  subscription: DocumentNode,
  options?: {
    variables?: TVariables;
    onData?: (data: TData) => void;
    onError?: (error: Error) => void;
  }
) {
  return useSubscription<TData, TVariables>(subscription, {
    ...options,
    onError: (error) => {
      console.error('GraphQL Subscription Error:', error);
      options?.onError?.(error);
    },
  });
}

/**
 * Hook to manually refetch queries
 */
export function useRefetchQueries() {
  const refetch = useCallback(async () => {
    await graphqlService.refetchQueries();
  }, []);

  return refetch;
}

/**
 * Hook to reset Apollo cache
 */
export function useResetCache() {
  const reset = useCallback(async () => {
    await graphqlService.resetCache();
  }, []);

  return reset;
}
