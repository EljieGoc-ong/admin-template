/**
 * Apollo Client Configuration
 * GraphQL client setup with authentication and error handling
 */

import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { authService } from '@/services';

// GraphQL endpoint - configure in environment variables
const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000/graphql';

// HTTP Link
const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
  credentials: 'include', // Include cookies for authentication
});

// Auth Link - Add authentication token to headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from storage
  const token = authService.getAuthToken();
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      // Add any other custom headers here
    }
  };
});

// Error Link - Handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        extensions
      );

      // Handle specific error codes
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Redirect to login or refresh token
        console.error('User is not authenticated');
        // authService.logout();
        // window.location.href = '/auth';
      }

      if (extensions?.code === 'FORBIDDEN') {
        console.error('User does not have permission');
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Handle network errors (e.g., show notification)
  }
});

// Logging Link - Log all operations (development only)
const loggingLink = new ApolloLink((operation, forward) => {
  if (import.meta.env.DEV) {
    console.log(`[GraphQL Operation]: ${operation.operationName}`, {
      variables: operation.variables,
      query: operation.query.loc?.source.body,
    });
  }
  return forward(operation);
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Configure field policies here
        // Example: pagination, caching strategies
      },
    },
  },
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: from([loggingLink, errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  // Enable dev tools in development
  connectToDevTools: import.meta.env.DEV,
});

// Helper function to reset cache (useful for logout)
export const resetApolloCache = async () => {
  await apolloClient.clearStore();
};

// Helper function to refetch active queries
export const refetchActiveQueries = async () => {
  await apolloClient.refetchQueries({
    include: 'active',
  });
};
