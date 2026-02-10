/**
 * GraphQL Usage Examples
 * This file demonstrates how to use Apollo Client with the GraphQL service
 * 
 * NOTE: This is an example file - remove it in production
 */

import { useGraphQLQuery, useGraphQLMutation } from '@/hooks/useGraphQL';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from '@/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Example 1: Simple Query
 */
export function UsersListExample() {
  const { data, loading, error, refetch } = useGraphQLQuery(GET_USERS, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data?.users?.nodes?.map((user: { id: string; name?: string; email: string }) => (
            <div key={user.id} className="p-2 border rounded">
              <p className="font-medium">{user.name || user.email}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => refetch()} className="mt-4">
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Example 2: Mutation with Form
 */
export function CreateUserExample() {
  const [createUser, { loading }] = useGraphQLMutation(CREATE_USER, {
    // Automatically refetch users list after creating
    refetchQueries: ['GetUsers'],
    onCompleted: (data) => {
      console.log('User created:', data.createUser);
      alert(`User created: ${data.createUser.name}`);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await createUser({
      variables: {
        input: {
          email: formData.get('email') as string,
          name: formData.get('name') as string,
          permissions: ['dashboard:read'],
        },
      },
    });

    e.currentTarget.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="john@example.com"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * Example 3: Update Mutation
 */
export function UpdateUserExample({ userId }: { userId: string }) {
  const [updateUser, { loading }] = useGraphQLMutation(UPDATE_USER, {
    onCompleted: (data) => {
      console.log('User updated:', data.updateUser);
    },
  });

  const handleUpdateName = async (newName: string) => {
    await updateUser({
      variables: {
        id: userId,
        input: {
          name: newName,
        },
      },
    });
  };

  return (
    <Button onClick={() => handleUpdateName('Updated Name')} disabled={loading}>
      {loading ? 'Updating...' : 'Update User Name'}
    </Button>
  );
}

/**
 * Example 4: Delete Mutation
 */
export function DeleteUserExample({ userId }: { userId: string }) {
  const [deleteUser, { loading }] = useGraphQLMutation(DELETE_USER, {
    refetchQueries: ['GetUsers'],
    onCompleted: (data) => {
      if (data.deleteUser.success) {
        alert('User deleted successfully');
      }
    },
  });

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    await deleteUser({
      variables: { id: userId },
    });
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete User'}
    </Button>
  );
}

/**
 * Example 5: Using GraphQL Service Directly
 */
export function DirectServiceExample() {
  const handleFetchUsers = async () => {
    try {
      const { graphqlService, GET_USERS } = await import('@/services');
      
      const result = await graphqlService.query(GET_USERS, {
        limit: 5,
        offset: 0,
      });

      console.log('Users:', result.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Button onClick={handleFetchUsers}>
      Fetch Users (Direct Service)
    </Button>
  );
}

/**
 * Example 6: Polling for Real-Time Updates
 */
export function SystemMetricsExample() {
  // This will poll the server every 5 seconds
  const { data } = useGraphQLQuery(
    GET_USERS, // Replace with GET_SYSTEM_METRICS in real implementation
    {
      pollInterval: 5000, // 5 seconds
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Metrics (Live)</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Auto-refreshes every 5 seconds
        </p>
        <div className="mt-4">
          {/* Display metrics here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Example Usage in a Component
 */
export function GraphQLExamplesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">GraphQL Usage Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsersListExample />
        <CreateUserExample />
      </div>

      <div className="flex gap-4">
        <UpdateUserExample userId="123" />
        <DeleteUserExample userId="123" />
        <DirectServiceExample />
      </div>

      <SystemMetricsExample />
    </div>
  );
}
