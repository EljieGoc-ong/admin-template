/**
 * GraphQL Service
 * Wrapper around Apollo Client for GraphQL operations
 */

import { apolloClient, resetApolloCache, refetchActiveQueries } from '@/config/apollo';
import type { 
  ApolloQueryResult, 
  FetchResult, 
  DocumentNode, 
  OperationVariables,
  ErrorPolicy,
  QueryOptions
} from '@apollo/client';

class GraphQLService {
  /**
   * Execute a query
   */
  async query<TData = any, TVariables extends OperationVariables = OperationVariables>(
    query: DocumentNode,
    variables?: TVariables,
    options?: Partial<Omit<QueryOptions<TData, TVariables>, 'query' | 'variables'>>
  ): Promise<ApolloQueryResult<TData>> {
    try {
      return await apolloClient.query<TData, TVariables>({
        query,
        variables,
        ...options,
      }) as ApolloQueryResult<TData>;
    } catch (error) {
      console.error('GraphQL Query Error:', error);
      throw error;
    }
  }

  /**
   * Execute a mutation
   */
  async mutate<TData = any, TVariables extends OperationVariables = OperationVariables>(
    mutation: DocumentNode,
    variables?: TVariables,
    options?: {
      refetchQueries?: string[] | DocumentNode[];
      awaitRefetchQueries?: boolean;
      errorPolicy?: ErrorPolicy;
    }
  ): Promise<FetchResult<TData>> {
    try {
      const result = await apolloClient.mutate<TData, TVariables>({
        mutation,
        variables,
        ...options,
      });

      return result;
    } catch (error) {
      console.error('GraphQL Mutation Error:', error);
      throw error;
    }
  }

  /**
   * Watch a query (with real-time updates)
   */
  watchQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
    query: DocumentNode,
    variables?: TVariables,
    options?: {
      fetchPolicy?: 'cache-first' | 'cache-and-network' | 'network-only';
      pollInterval?: number;
    }
  ) {
    return apolloClient.watchQuery<TData, TVariables>({
      query,
      variables,
      ...options,
    });
  }

  /**
   * Reset Apollo cache (e.g., on logout)
   */
  async resetCache(): Promise<void> {
    await resetApolloCache();
  }

  /**
   * Refetch all active queries
   */
  async refetchQueries(): Promise<void> {
    await refetchActiveQueries();
  }

  /**
   * Write data to cache
   */
  writeCache<TData = any>(options: {
    query: DocumentNode;
    data: TData;
    variables?: OperationVariables;
  }): void {
    apolloClient.writeQuery(options);
  }

  /**
   * Read data from cache
   */
  readCache<TData = any>(options: {
    query: DocumentNode;
    variables?: OperationVariables;
  }): TData | null {
    return apolloClient.readQuery(options);
  }

  /**
   * Subscribe to real-time updates (if your backend supports subscriptions)
   */
  subscribe<TData = any, TVariables extends OperationVariables = OperationVariables>(
    subscription: DocumentNode,
    variables?: TVariables
  ) {
    return apolloClient.subscribe<TData, TVariables>({
      query: subscription,
      variables,
    });
  }

  /**
   * Get Apollo Client instance (for advanced usage)
   */
  getClient() {
    return apolloClient;
  }
}

export const graphqlService = new GraphQLService();
