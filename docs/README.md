# Documentation Index

Welcome to the Admin Dashboard documentation! This directory contains comprehensive guides for the system.

---

## 📖 Available Documentation

### 🔐 Security & Access Control

#### [RBAC System](./PERMISSION_BASED_RBAC.md)
Complete guide to the permission-based Role-Based Access Control system.

**Topics Covered:**
- Permission structure (`feature:action`)
- Permission checking and validation
- Guards and route protection
- Custom hooks (`usePermission`)
- Dynamic navigation filtering
- Backend integration
- Implementation examples

**Best for:** Understanding and implementing permission-based access control in your application.

---

### 🔌 Backend Integration

#### [GraphQL Integration](./GRAPHQL_INTEGRATION.md)
Complete guide to Apollo Client and GraphQL setup.

**Topics Covered:**
- Apollo Client configuration
- Authentication token injection
- Error handling
- GraphQL queries and mutations
- Custom React hooks
- Caching strategies
- Real-time updates (polling & subscriptions)
- Backend schema examples
- Best practices

**Best for:** Connecting to a GraphQL backend and implementing data fetching.

---

## 🚀 Quick Start Guide

### For Developers

1. **Project Setup**
   - Read the main [README](../README.md) for installation and quick start
   - Run `npm install` and `npm run dev`

2. **Understand RBAC**
   - Review [PERMISSION_BASED_RBAC.md](./PERMISSION_BASED_RBAC.md)
   - Learn about permission-based access control (`feature:action` format)
   - Implement permission guards in your components
   - Use `usePermission` hook for conditional rendering

3. **Connect to Backend**
   - Read [GRAPHQL_INTEGRATION.md](./GRAPHQL_INTEGRATION.md)
   - Configure your GraphQL endpoint in `.env`
   - Use provided hooks: `useGraphQLQuery`, `useGraphQLMutation`
   - Check example implementations in `src/examples/GraphQLExample.tsx`

### For Administrators

- **User Management**: 
  - Understand the [Permission System](./PERMISSION_BASED_RBAC.md#permission-structure)
  - Assign granular permissions to users
  - Permissions follow `feature:action` format (e.g., `users:write`, `dashboard:read`)

- **System Configuration**: 
  - Configure GraphQL backend endpoint
  - Set up authentication tokens
  - Review [GraphQL Setup](./GRAPHQL_INTEGRATION.md#configuration)

---

## 📝 Documentation Structure

```
docs/
├── README.md                     # This file - documentation index
├── PERMISSION_BASED_RBAC.md      # Permission-based RBAC system (15KB)
└── GRAPHQL_INTEGRATION.md        # GraphQL & Apollo Client (14KB)
```

---

## 🎯 Common Tasks

### Implement Permission Check

See [PERMISSION_BASED_RBAC.md - Usage Examples](./PERMISSION_BASED_RBAC.md#usage-examples)

```typescript
import { usePermission } from '@/hooks/usePermission';

function MyComponent() {
  const canEdit = usePermission('users:write');
  
  return canEdit ? <EditButton /> : null;
}
```

### Make a GraphQL Query

See [GRAPHQL_INTEGRATION.md - Usage Examples](./GRAPHQL_INTEGRATION.md#usage-examples)

```typescript
import { useGraphQLQuery, GET_USERS } from '@/services';

function UsersList() {
  const { data, loading } = useGraphQLQuery(GET_USERS);
  // ...
}
```

### Protect a Route

See [PERMISSION_BASED_RBAC.md - Route Protection](./PERMISSION_BASED_RBAC.md#route-protection)

```typescript
<Route path="/admin" element={
  <RouteGuard requiredPermission="administration:read">
    <AdminPage />
  </RouteGuard>
} />
```

---

## 🔗 External Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Shadcn UI](https://ui.shadcn.com)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/learn/)

---

## 📞 Support

For detailed information, please check the relevant documentation above.

**Project Structure:**
```
src/
├── pages/              # Page components
├── components/         # Reusable components
│   ├── admin/         # Admin-specific
│   ├── auth/          # Authentication
│   └── guards/        # Permission guards
├── services/          # Business logic
│   ├── graphql/       # GraphQL operations
│   ├── auth/          # Auth service
│   └── rbac/          # RBAC service
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── config/            # Configuration
│   └── apollo.ts      # Apollo Client
└── types/             # TypeScript types
```

---

**Need more help?** Check the main [README](../README.md) or dive into the specific documentation above.
