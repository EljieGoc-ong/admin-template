# Permission-Based RBAC Documentation

## 📋 Overview

This application uses a **permission-based access control** system where permissions are defined as `feature:action` strings. The backend assigns specific permissions to users, and the frontend checks these permissions to control access.

---

## 🔑 Permission Format

### Structure
```
feature:action
```

### Actions
- `read` - View/read access
- `write` - Create, update, delete access

### Examples
```typescript
"users:read"           // Can view users
"users:write"          // Can create/update/delete users
"reports:read"         // Can view reports
"reports:write"        // Can create/edit reports
"settings:read"        // Can view settings
"settings:write"       // Can modify settings
"administration:read"  // Can access admin panel
```

---

## 🔧 Backend Integration

### Login/Signup Response Format

The backend **MUST** return user permissions in this format:

```typescript
POST /api/auth/login
POST /api/auth/signup

// Response
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "permissions": [              // REQUIRED: Array of permission strings
      "dashboard:read",
      "users:read",
      "users:write",
      "reports:read",
      "reports:write",
      "settings:read",
      "monitoring:read"
    ]
  }
}
```

### Key Points

1. **Permissions Array**: Must be an array of strings in `feature:action` format
2. **No Roles**: The system doesn't use roles - only permissions
3. **Backend Controls**: Backend determines which permissions each user gets
4. **Frontend Enforces**: Frontend shows/hides UI based on permissions
5. **Server Validation**: Always validate permissions on the backend for security

---

## 🎯 Available Permissions

### Dashboard
```typescript
"dashboard:read"   // View dashboard
"dashboard:write"  // Customize dashboard
```

### Users
```typescript
"users:read"       // View users list
"users:write"      // Create, update, delete users
```

### Reports
```typescript
"reports:read"     // View reports
"reports:write"    // Create, edit, delete reports
```

### Settings
```typescript
"settings:read"    // View settings
"settings:write"   // Modify settings
```

### Monitoring
```typescript
"monitoring:read"  // View monitoring data
"monitoring:write" // Configure monitoring
```

### Activity Logs
```typescript
"activity_logs:read"   // View activity logs
"activity_logs:write"  // Manage activity logs
```

### System
```typescript
"system:read"      // View system info
"system:write"     // Perform system operations
```

### Administration
```typescript
"administration:read"   // Access admin panel
"administration:write"  // Full admin operations
```

---

## 💻 Frontend Usage

### 1. Check Permission in Components

```typescript
import { usePermission } from '@/hooks/usePermission';
import { Action } from '@/types/rbac';

function UserList() {
  const canWrite = usePermission('users', Action.WRITE);

  return (
    <div>
      <h1>Users</h1>
      {canWrite && (
        <button onClick={handleCreate}>Create User</button>
      )}
    </div>
  );
}
```

### 2. Use Permission Guard

```typescript
import { PermissionGuard } from '@/components/guards/PermissionGuard';
import { Action } from '@/types/rbac';

function Settings() {
  return (
    <PermissionGuard
      feature="settings"
      action={Action.WRITE}
      fallback={<p>You don't have permission to edit settings</p>}
    >
      <SettingsForm />
    </PermissionGuard>
  );
}
```

### 3. Check Exact Permission String

```typescript
import { useHasPermission } from '@/hooks/usePermission';

function AdminPanel() {
  const canAccess = useHasPermission('administration:read');

  if (!canAccess) {
    return <div>Access Denied</div>;
  }

  return <AdminContent />;
}
```

### 4. Check Multiple Permissions

```typescript
import { useHasAnyPermission } from '@/hooks/usePermission';

function Dashboard() {
  // User needs at least one of these permissions
  const canAccessDashboard = useHasAnyPermission([
    'dashboard:read',
    'reports:read'
  ]);

  if (!canAccessDashboard) {
    return <div>No dashboard access</div>;
  }

  return <DashboardContent />;
}
```

### 5. Check Read/Write Access

```typescript
import { useCanWrite, useCanRead } from '@/hooks/usePermission';

function ReportsPage() {
  const canRead = useCanRead('reports');
  const canWrite = useCanWrite('reports');

  return (
    <div>
      {canRead && <ReportsList />}
      {canWrite && <CreateReportButton />}
    </div>
  );
}
```

---

## 🛡️ Backend Implementation Guide

### Database Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Permissions table (available permissions)
CREATE TABLE permissions (
  id UUID PRIMARY KEY,
  code VARCHAR(100) NOT NULL UNIQUE,  -- e.g., "users:read"
  feature VARCHAR(50) NOT NULL,        -- e.g., "users"
  action VARCHAR(20) NOT NULL,         -- e.g., "read"
  description TEXT
);

-- User permissions (assigned to users)
CREATE TABLE user_permissions (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, permission_id)
);

-- Optional: Permission groups/templates for easy assignment
CREATE TABLE permission_groups (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,  -- e.g., "Admin", "Manager", "Viewer"
  description TEXT
);

CREATE TABLE permission_group_permissions (
  group_id UUID REFERENCES permission_groups(id),
  permission_id UUID REFERENCES permissions(id),
  PRIMARY KEY (group_id, permission_id)
);
```

### Backend API Examples

#### Node.js + Express

```typescript
// types.ts
interface User {
  id: string;
  email: string;
  name: string;
}

interface Permission {
  code: string;  // "feature:action"
}

// auth.controller.ts
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  // 1. Validate credentials
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 2. Get user's permissions from database
  const permissions = await db.query(`
    SELECT p.code
    FROM permissions p
    JOIN user_permissions up ON up.permission_id = p.id
    WHERE up.user_id = $1
  `, [user.id]);

  const permissionCodes = permissions.rows.map(p => p.code);

  // 3. Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // 4. Return user with permissions
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      permissions: permissionCodes  // Array of "feature:action" strings
    }
  });
}

// Middleware to check permissions
export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;  // From JWT middleware

    const hasPermission = await db.query(`
      SELECT 1
      FROM user_permissions up
      JOIN permissions p ON p.id = up.permission_id
      WHERE up.user_id = $1 AND p.code = $2
    `, [user.id, permission]);

    if (hasPermission.rows.length === 0) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

// Protected route example
router.delete('/users/:id', 
  requirePermission('users:write'),
  async (req, res) => {
    // Delete user logic
  }
);
```

#### Python + Flask

```python
# models.py
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255))
    password_hash = db.Column(db.String(255), nullable=False)
    permissions = db.relationship('Permission', secondary='user_permissions')

class Permission(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    code = db.Column(db.String(100), unique=True, nullable=False)
    feature = db.Column(db.String(50), nullable=False)
    action = db.Column(db.String(20), nullable=False)

# auth.py
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Validate credentials
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Get user permissions
    permissions = [p.code for p in user.permissions]

    # Generate token
    token = jwt.encode({
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, app.config['SECRET_KEY'])

    # Return response
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'permissions': permissions  # Array of "feature:action"
        }
    })

# Decorator for permission checking
def require_permission(permission_code):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user = g.user  # From JWT middleware
            
            has_permission = Permission.query.join(
                user_permissions
            ).filter(
                user_permissions.c.user_id == user.id,
                Permission.code == permission_code
            ).first()

            if not has_permission:
                return jsonify({'error': 'Insufficient permissions'}), 403

            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Protected route
@app.route('/api/users/<user_id>', methods=['DELETE'])
@require_permission('users:write')
def delete_user(user_id):
    # Delete user logic
    pass
```

---

## 📊 Permission Assignment Strategies

### Strategy 1: Direct Assignment
Assign permissions directly to users.

```sql
-- Assign permission to user
INSERT INTO user_permissions (user_id, permission_id)
SELECT '123', id FROM permissions WHERE code = 'users:read';
```

### Strategy 2: Permission Groups/Templates
Create permission groups and assign groups to users.

```sql
-- Create "Admin" group with permissions
INSERT INTO permission_groups (id, name) VALUES ('group-1', 'Admin');

INSERT INTO permission_group_permissions (group_id, permission_id)
SELECT 'group-1', id FROM permissions 
WHERE code IN ('users:read', 'users:write', 'settings:write');

-- Assign user to group (copy permissions)
INSERT INTO user_permissions (user_id, permission_id)
SELECT 'user-123', permission_id 
FROM permission_group_permissions 
WHERE group_id = 'group-1';
```

### Strategy 3: Hierarchical
Some permissions imply others.

```typescript
// Backend logic
function getEffectivePermissions(directPermissions: string[]): string[] {
  const effective = [...directPermissions];
  
  // Write implies read
  directPermissions.forEach(perm => {
    if (perm.endsWith(':write')) {
      const feature = perm.split(':')[0];
      effective.push(`${feature}:read`);
    }
  });

  return [...new Set(effective)];
}
```

---

## 🧪 Testing

### Test Different Permission Sets

```bash
# Login with different permissions
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'

# Response will include permissions array
{
  "token": "...",
  "user": {
    "id": "1",
    "email": "admin@example.com",
    "permissions": ["users:read", "users:write", ...]
  }
}
```

### Frontend Testing

```typescript
// Mock user with permissions for testing
const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  permissions: [
    'dashboard:read',
    'users:read',
    'reports:read',
    'reports:write'
  ]
};
```

---

## 🔒 Security Best Practices

### 1. Always Validate on Backend
```typescript
// ❌ Bad - Only frontend check
if (hasPermission('users', 'delete')) {
  await deleteUser(userId);
}

// ✅ Good - Backend validates
await api.delete(`/users/${userId}`);
// Backend checks permission before deleting
```

### 2. Use JWT Claims Carefully
```typescript
// Don't store permissions in JWT
// Always fetch fresh from database

// ✅ Good
const permissions = await getUserPermissions(userId);
```

### 3. Audit Permission Changes
```sql
CREATE TABLE permission_audit_log (
  id UUID PRIMARY KEY,
  user_id UUID,
  permission_code VARCHAR(100),
  action VARCHAR(20),  -- 'granted', 'revoked'
  by_user_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Rate Limiting
```typescript
// Protect permission-checking endpoints
app.use('/api/auth/permissions', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
```

---

## 📚 Example Permission Sets

### Super Admin
```json
{
  "permissions": [
    "dashboard:read", "dashboard:write",
    "users:read", "users:write",
    "reports:read", "reports:write",
    "settings:read", "settings:write",
    "monitoring:read", "monitoring:write",
    "activity_logs:read", "activity_logs:write",
    "system:read", "system:write",
    "administration:read", "administration:write"
  ]
}
```

### Admin
```json
{
  "permissions": [
    "dashboard:read",
    "users:read", "users:write",
    "reports:read", "reports:write",
    "settings:read", "settings:write",
    "monitoring:read",
    "activity_logs:read",
    "administration:read"
  ]
}
```

### Manager
```json
{
  "permissions": [
    "dashboard:read",
    "users:read",
    "reports:read", "reports:write",
    "monitoring:read"
  ]
}
```

### User
```json
{
  "permissions": [
    "dashboard:read",
    "reports:read"
  ]
}
```

### Viewer
```json
{
  "permissions": [
    "dashboard:read"
  ]
}
```

---

**Key Takeaway:** The backend controls who gets which permissions. The frontend uses those permissions to show/hide UI and make appropriate API calls. Always validate permissions on the backend for security.
