# GraphQL Integration Guide

## 📋 Overview

This application uses **Apollo Client** for GraphQL operations. Apollo Client provides caching, real-time updates, and a powerful developer experience.

---

## 🚀 Quick Start

### Installation

Already installed! Dependencies included:
- `@apollo/client` - Apollo Client library
- `graphql` - GraphQL core library

### Configuration

Set your GraphQL endpoint in `.env`:

```env
VITE_GRAPHQL_URI=http://localhost:4000/graphql
```

---

## 🔧 Apollo Client Setup

### Configuration File

Located at `src/config/apollo.ts`:

```typescript
import { apolloClient } from '@/config/apollo';

// Features:
// ✅ Automatic authentication token injection
// ✅ Error handling (authentication, network, GraphQL errors)
// ✅ Request logging (development only)
// ✅ Cache configuration
// ✅ Development tools integration
```

### Key Features

1. **Auth Link** - Automatically adds JWT token to requests
2. **Error Link** - Handles and logs errors
3. **Logging Link** - Logs operations in development
4. **Cache** - Intelligent caching with InMemoryCache

---

## 💻 Usage Examples

### 1. Using Hooks in Components

#### Simple Query

```typescript
import { useGraphQLQuery } from '@/hooks/useGraphQL';
import { GET_USERS } from '@/services';

function UsersList() {
  const { data, loading, error } = useGraphQLQuery(GET_USERS, {
    variables: { limit: 10, offset: 0 }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.users.nodes.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

#### Mutation

```typescript
import { useGraphQLMutation } from '@/hooks/useGraphQL';
import { CREATE_USER, GET_USERS } from '@/services';

function CreateUserForm() {
  const [createUser, { loading }] = useGraphQLMutation(CREATE_USER, {
    // Refetch users list after creating
    refetchQueries: ['GetUsers'],
    onCompleted: (data) => {
      console.log('User created:', data.createUser);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({
      variables: {
        input: {
          email: 'user@example.com',
          name: 'New User',
          permissions: ['dashboard:read']
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        Create User
      </button>
    </form>
  );
}
```

#### Lazy Query

```typescript
import { useGraphQLLazyQuery } from '@/hooks/useGraphQL';
import { GET_USER_BY_ID } from '@/services';

function UserDetail() {
  const [loadUser, { data, loading }] = useGraphQLLazyQuery(GET_USER_BY_ID);

  const handleClick = (userId: string) => {
    loadUser({ variables: { id: userId } });
  };

  return (
    <div>
      <button onClick={() => handleClick('123')}>Load User</button>
      {loading && <p>Loading...</p>}
      {data && <p>{data.user.name}</p>}
    </div>
  );
}
```

### 2. Using GraphQL Service Directly

```typescript
import { graphqlService, GET_USERS, CREATE_USER } from '@/services';

// Execute query
async function fetchUsers() {
  const result = await graphqlService.query(GET_USERS, {
    limit: 10,
    offset: 0
  });
  
  return result.data.users;
}

// Execute mutation
async function createUser(input) {
  const result = await graphqlService.mutate(CREATE_USER, {
    input
  }, {
    refetchQueries: ['GetUsers']
  });
  
  return result.data.createUser;
}
```

### 3. Polling for Real-Time Data

```typescript
import { useGraphQLQuery } from '@/hooks/useGraphQL';
import { GET_SYSTEM_METRICS } from '@/services';

function SystemMetrics() {
  // Poll every 5 seconds
  const { data } = useGraphQLQuery(GET_SYSTEM_METRICS, {
    pollInterval: 5000
  });

  return (
    <div>
      <p>CPU: {data?.systemMetrics.cpuUsage}</p>
      <p>Memory: {data?.systemMetrics.memoryUsage}</p>
    </div>
  );
}
```

### 4. Subscriptions (Real-Time Updates)

```typescript
import { useGraphQLSubscription } from '@/hooks/useGraphQL';
import { gql } from '@apollo/client';

const ACTIVITY_LOG_SUBSCRIPTION = gql`
  subscription OnActivityLog {
    activityLogAdded {
      id
      user
      action
      timestamp
    }
  }
`;

function ActivityLogsFeed() {
  const { data } = useGraphQLSubscription(ACTIVITY_LOG_SUBSCRIPTION);

  return (
    <div>
      {data?.activityLogAdded && (
        <div>New activity: {data.activityLogAdded.action}</div>
      )}
    </div>
  );
}
```

---

## 📝 GraphQL Operations

### Queries

Located in `src/services/graphql/queries.ts`

Available queries:
- `GET_CURRENT_USER` - Get authenticated user
- `GET_USERS` - Get users list with pagination
- `GET_USER_BY_ID` - Get specific user
- `GET_ACTIVITY_LOGS` - Get activity logs
- `GET_SYSTEM_METRICS` - Get system metrics
- `GET_REPORTS` - Get reports list
- `GET_SYSTEM_SETTINGS` - Get system settings

### Mutations

Located in `src/services/graphql/mutations.ts`

Available mutations:
- `LOGIN` - Authenticate user
- `SIGNUP` - Register new user
- `CREATE_USER` - Create user
- `UPDATE_USER` - Update user
- `DELETE_USER` - Delete user
- `UPDATE_USER_PERMISSIONS` - Update permissions
- `CREATE_REPORT` - Create report
- `UPDATE_SYSTEM_SETTINGS` - Update settings
- `CLEAR_CACHE` - Clear system cache
- `BACKUP_DATABASE` - Backup database

### Fragments

Located in `src/services/graphql/fragments.ts`

Reusable fragments:
- `USER_FRAGMENT` - Basic user fields
- `USER_WITH_PERMISSIONS_FRAGMENT` - User with permissions
- `PAGE_INFO_FRAGMENT` - Pagination info
- `ACTIVITY_LOG_FRAGMENT` - Activity log fields
- `REPORT_FRAGMENT` - Report fields

---

## 🔐 Authentication

### Token Injection

Authentication token is automatically added to all requests:

```typescript
// In apollo.ts
const authLink = setContext((_, { headers }) => {
  const token = authService.getAuthToken();
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});
```

### Login Example

```typescript
import { useGraphQLMutation } from '@/hooks/useGraphQL';
import { LOGIN } from '@/services';

function LoginForm() {
  const [login] = useGraphQLMutation(LOGIN);

  const handleLogin = async (email, password) => {
    const { data } = await login({
      variables: { email, password }
    });

    // Store token
    localStorage.setItem('auth_token', data.login.token);
    
    // User permissions
    console.log(data.login.user.permissions);
  };
}
```

---

## 🗄️ Caching

### Cache Configuration

```typescript
// Automatic caching
const { data } = useGraphQLQuery(GET_USER_BY_ID, {
  variables: { id: '123' },
  fetchPolicy: 'cache-first' // Use cache if available
});
```

### Fetch Policies

- `cache-first` - Check cache first, then network
- `cache-and-network` - Check cache, then update from network
- `network-only` - Always fetch from network
- `cache-only` - Only use cache
- `no-cache` - Don't use cache at all

### Manual Cache Updates

```typescript
import { graphqlService } from '@/services';
import { GET_USER_BY_ID } from '@/services';

// Write to cache
graphqlService.writeCache({
  query: GET_USER_BY_ID,
  variables: { id: '123' },
  data: {
    user: { id: '123', name: 'John', email: 'john@example.com' }
  }
});

// Read from cache
const cachedData = graphqlService.readCache({
  query: GET_USER_BY_ID,
  variables: { id: '123' }
});
```

---

## 🎯 Backend GraphQL Schema Example

### User Type

```graphql
type User {
  id: ID!
  email: String!
  name: String
  permissions: [String!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  me: User!
  user(id: ID!): User
  users(limit: Int, offset: Int, search: String): UserConnection!
}

type Mutation {
  login(input: LoginInput!): AuthPayload!
  signup(input: SignupInput!): AuthPayload!
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): DeleteResponse!
  updateUserPermissions(userId: ID!, permissions: [String!]!): User!
}

input LoginInput {
  email: String!
  password: String!
}

input SignupInput {
  email: String!
  password: String!
  name: String
}

input CreateUserInput {
  email: String!
  name: String
  permissions: [String!]!
}

input UpdateUserInput {
  email: String
  name: String
  permissions: [String!]
}

type AuthPayload {
  token: String!
  user: User!
}

type DeleteResponse {
  success: Boolean!
  message: String
}

type UserConnection {
  nodes: [User!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

### Example Resolvers (Node.js)

```typescript
const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findById(user.id);
    },
    
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    
    users: async (_, { limit = 10, offset = 0, search }) => {
      const query = search ? { email: { $regex: search, $options: 'i' } } : {};
      const nodes = await User.find(query).limit(limit).skip(offset);
      const totalCount = await User.countDocuments(query);
      
      return {
        nodes,
        totalCount,
        pageInfo: {
          hasNextPage: offset + limit < totalCount,
          hasPreviousPage: offset > 0
        }
      };
    }
  },
  
  Mutation: {
    login: async (_, { input }) => {
      const { email, password } = input;
      
      // Validate credentials
      const user = await User.findOne({ email });
      if (!user || !await user.comparePassword(password)) {
        throw new Error('Invalid credentials');
      }
      
      // Get user permissions
      const permissions = await getUserPermissions(user.id);
      
      // Generate token
      const token = generateToken({ userId: user.id });
      
      return {
        token,
        user: {
          ...user.toObject(),
          permissions
        }
      };
    },
    
    createUser: async (_, { input }, { user: currentUser }) => {
      // Check permissions
      if (!hasPermission(currentUser, 'users:write')) {
        throw new Error('Insufficient permissions');
      }
      
      const user = await User.create(input);
      return user;
    }
  }
};
```

---

## 🔍 Error Handling

### Client-Side

```typescript
const { data, loading, error } = useGraphQLQuery(GET_USERS);

if (error) {
  // GraphQL errors
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions.code === 'UNAUTHENTICATED') {
        // Redirect to login
      }
    });
  }
  
  // Network errors
  if (error.networkError) {
    console.error('Network error:', error.networkError);
  }
}
```

### Global Error Handling

Already configured in `src/config/apollo.ts`:

```typescript
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Handle authentication errors
      }
    });
  }
});
```

---

## 📊 Development Tools

### Apollo DevTools

Install the browser extension:
- [Chrome](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/)

Features:
- Query inspector
- Cache viewer
- Mutation tracker
- Performance metrics

---

## 🧪 Testing

### Mock Apollo Provider

```typescript
import { MockedProvider } from '@apollo/client/testing';
import { GET_USERS } from '@/services';

const mocks = [
  {
    request: {
      query: GET_USERS,
      variables: { limit: 10, offset: 0 }
    },
    result: {
      data: {
        users: {
          nodes: [{ id: '1', email: 'test@example.com', name: 'Test' }],
          totalCount: 1
        }
      }
    }
  }
];

// In test
<MockedProvider mocks={mocks}>
  <UsersList />
</MockedProvider>
```

---

## 🚀 Best Practices

### 1. Use Fragments
```typescript
import { USER_FRAGMENT } from '@/services';

const GET_USERS = gql`
  query GetUsers {
    users {
      nodes {
        ...UserFields
      }
    }
  }
  ${USER_FRAGMENT}
`;
```

### 2. Optimize with Field Selection
```graphql
# ❌ Bad - Request unnecessary fields
query GetUsers {
  users {
    id
    email
    name
    createdAt
    updatedAt
    permissions
    # ... many more fields
  }
}

# ✅ Good - Only request what you need
query GetUsersList {
  users {
    id
    email
    name
  }
}
```

### 3. Use Variables
```typescript
// ✅ Good
const { data } = useGraphQLQuery(GET_USER_BY_ID, {
  variables: { id: userId }
});

// ❌ Bad - String interpolation
const GET_USER = gql`
  query {
    user(id: "${userId}") {
      id
      name
    }
  }
`;
```

### 4. Handle Loading States
```typescript
const { data, loading, error } = useGraphQLQuery(GET_USERS);

if (loading) return <Skeleton />;
if (error) return <ErrorMessage error={error} />;
if (!data) return null;

return <UsersList users={data.users} />;
```

---

## 📚 Additional Resources

- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [GraphQL Spec](https://graphql.org/learn/)
- [Apollo DevTools](https://www.apollographql.com/docs/react/development-testing/developer-tooling/)

---

**Apollo Client is now fully integrated and ready to use!** 🚀
