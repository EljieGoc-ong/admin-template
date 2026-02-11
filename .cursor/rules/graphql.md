# GraphQL Integration Rules

## Overview
This project uses Apollo Client for GraphQL integration with a React frontend.

## Key Files
- `src/config/apollo.ts` - Apollo Client configuration
- `src/services/graphql/` - GraphQL queries, mutations, and subscriptions
- `src/hooks/useGraphQL.tsx` - Custom GraphQL hook
- `src/examples/GraphQLExample.tsx` - Usage examples

## Apollo Client Setup
Apollo Client is configured with:
- HTTP Link for GraphQL endpoint
- Error handling
- Cache configuration
- TypeScript support

## Query Pattern
Use Apollo Client hooks for data fetching:

```typescript
import { useQuery } from '@apollo/client';
import { GET_USER_QUERY } from '@/services/graphql/queries';
import type { User } from '@/types/rbac';

interface GetUserData {
  user: User;
}

interface GetUserVariables {
  id: string;
}

export const UserProfile = ({ userId }: { userId: string }) => {
  const { data, loading, error } = useQuery<GetUserData, GetUserVariables>(
    GET_USER_QUERY,
    {
      variables: { id: userId },
    }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return null;

  return <div>{data.user.name}</div>;
};
```

## Mutation Pattern
```typescript
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '@/services/graphql/mutations';

export const EditUser = ({ userId }: { userId: string }) => {
  const [updateUser, { loading, error }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: (data) => {
        console.log('User updated:', data);
      },
      onError: (error) => {
        console.error('Update failed:', error);
      },
    }
  );

  const handleSave = async (userData: UpdateUserInput) => {
    await updateUser({
      variables: { id: userId, input: userData },
    });
  };

  return <UserForm onSave={handleSave} loading={loading} error={error} />;
};
```

## Query Organization
Organize queries in service files:

```typescript
// src/services/graphql/queries/userQueries.ts
import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query GetUsers($filter: UserFilter) {
    users(filter: $filter) {
      id
      name
      email
      role
    }
  }
`;
```

## TypeScript Types
Use proper TypeScript types for GraphQL responses:

```typescript
import type { ApolloError } from '@apollo/client';

interface GetUserData {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface GetUserVariables {
  id: string;
}
```

## Error Handling
Handle loading, error, and success states consistently:

```typescript
const { data, loading, error } = useQuery(GET_USER_QUERY);

if (loading) {
  return <LoadingState />;
}

if (error) {
  return <ErrorState message={error.message} />;
}

if (!data) {
  return <EmptyState />;
}

return <DataDisplay data={data} />;
```

## Cache Management
```typescript
// Refetch query after mutation
const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
  refetchQueries: [{ query: GET_USERS_QUERY }],
});

// Update cache manually
const [createUser] = useMutation(CREATE_USER_MUTATION, {
  update(cache, { data }) {
    cache.modify({
      fields: {
        users(existingUsers = []) {
          const newUserRef = cache.writeFragment({
            data: data.createUser,
            fragment: gql`
              fragment NewUser on User {
                id
                name
                email
              }
            `,
          });
          return [...existingUsers, newUserRef];
        },
      },
    });
  },
});
```

## GraphQL Rules
1. **ALWAYS** use Apollo Client hooks for data fetching
2. **ALWAYS** follow patterns in `config/apollo.ts` and `services/graphql/`
3. **ALWAYS** handle loading, error, and success states consistently
4. **ALWAYS** use proper TypeScript types for GraphQL responses
5. **NEVER** make direct fetch calls for GraphQL - use Apollo Client
6. **NEVER** skip error handling in GraphQL operations

## Reference
See `docs/GRAPHQL_INTEGRATION.md` for complete documentation.
