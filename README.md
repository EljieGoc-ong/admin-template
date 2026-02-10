# Admin Dashboard

A modern, feature-rich admin dashboard built with React, TypeScript, and comprehensive Role-Based Access Control (RBAC).

---

## ✨ Features

- 🔐 **Role-Based Access Control** - 5-tier permission system
- 🎨 **Modern UI** - Built with Tailwind CSS and Shadcn UI
- 📊 **Dashboard Analytics** - Real-time system monitoring
- 👥 **User Management** - Complete user CRUD with roles
- 🛡️ **Security First** - Permission-based UI and route protection
- 🎯 **Type-Safe** - Full TypeScript coverage
- 🏗️ **Clean Architecture** - Services layer for business logic
- 📱 **Responsive** - Mobile-first design

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd admin-template

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

### Test Login

Use these email patterns to test different roles:

| Email | Role | Access Level |
|-------|------|--------------|
| `superadmin@example.com` | Super Admin | Full access |
| `admin@example.com` | Admin | Manage users & settings |
| `manager@example.com` | Manager | Users & reports |
| `user@example.com` | User | Basic dashboards |
| `viewer@example.com` | Viewer | Read-only |

*Password: any (minimum 6 characters)*

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

- **[Documentation Index](./docs/README.md)** - Start here for complete navigation
- **[RBAC System](./docs/PERMISSION_BASED_RBAC.md)** - Permission-based access control guide
- **[GraphQL Integration](./docs/GRAPHQL_INTEGRATION.md)** - Apollo Client & GraphQL setup

---

## 🏗️ Project Structure

```
admin-template/
├── src/
│   ├── pages/              # Page components
│   ├── components/         # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── auth/          # Authentication components
│   │   ├── guards/        # Permission guards
│   │   └── ui/            # Base UI components (Shadcn)
│   ├── services/          # Business logic layer
│   │   ├── api/           # API client
│   │   ├── auth/          # Authentication service
│   │   ├── rbac/          # RBAC service
│   │   ├── admin/         # Admin operations
│   │   ├── graphql/       # GraphQL queries, mutations
│   │   ├── validation/    # Validation utilities
│   │   └── storage/       # Storage service
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript definitions
│   ├── config/            # Configuration files
│   │   └── apollo.ts      # Apollo Client config
│   ├── data/              # Mock data
│   └── lib/               # Utility functions
├── docs/                  # Documentation
└── public/                # Static assets
```

---

## 🎭 Role System

### Role Hierarchy

```
Super Admin (100) → Full system access
    ↓
Admin (80) → Manage users, settings, reports
    ↓
Manager (60) → Team management, reports
    ↓
User (40) → Standard access
    ↓
Viewer (20) → Read-only
```

See [RBAC Documentation](./docs/RBAC_DOCUMENTATION.md) for detailed permissions.

---

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing

### UI
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Radix UI** - Unstyled components
- **Lucide React** - Icons

### State & Data
- **React Context** - State management
- **React Query** - Server state
- **Apollo Client** - GraphQL client
- **Zod** - Schema validation

### Development
- **ESLint** - Linting
- **Vitest** - Testing
- **TypeScript ESLint** - TS linting

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
```

---

## 🔑 Key Features

### Authentication
- Login/Signup with validation
- Remember me functionality
- Password strength checking
- Secure token storage
- Auto logout on session expiry

### Authorization (RBAC)
- 5-tier role hierarchy
- Fine-grained permissions
- Resource-based access control
- Route protection
- UI element filtering
- Permission guards

### User Management
- User CRUD operations
- Role assignment
- Activity tracking
- Status management
- Permission override

### Admin Dashboard
- System health monitoring
- User activity logs
- Performance metrics
- Database management
- System settings

### Security
- Role-based access control
- Permission validation
- Secure route protection
- Activity audit trail
- Session management

---

## 🎨 UI Components

Built with Shadcn UI, includes:
- Buttons, Inputs, Forms
- Cards, Modals, Dialogs
- Tables, Badges, Avatars
- Tabs, Accordions, Tooltips
- Dropdowns, Selects, Checkboxes
- And 40+ more components

---

## 🔐 Security

### Client-Side
- Permission-based UI rendering
- Route guards
- Role validation
- Token management

### Best Practices
- Input validation
- XSS prevention
- CSRF protection ready
- Secure storage
- Audit logging ready

⚠️ **Important:** Always validate permissions server-side in production.

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Coverage
- Unit tests for services
- Component tests
- Hook tests
- Integration tests ready

---

## 📈 Performance

- Code splitting
- Lazy loading routes
- Optimized bundle size
- Tree shaking
- Asset optimization

---

## Snyk Security Scanning

This project uses [Snyk](https://snyk.io/) for security vulnerability scanning and code analysis.

### Prerequisites

1. **Install Snyk CLI:**
   ```bash
   npm install -g snyk
   ```

2. **Authenticate with Snyk:**
   ```bash
   snyk auth
   ```
   This will open a browser window to authenticate with your Snyk account.

### Configuration

The project includes a `.snyk` policy file that configures security scanning:

- **Excluded from scans:** Test files and directories (`src/test/**`, `**/*.test.ts`)
- **Reason:** Test files contain hardcoded test fixtures and mock data, not production secrets

```yaml
# .snyk
exclude:
  global:
    - src/test/**
    - '**/*.test.ts'
    - '**/*.test.tsx'
    - '**/*.spec.ts'
    - '**/*.spec.tsx'
```

### Running Snyk Scans

#### Code Security Analysis
Scan for security vulnerabilities in your code:

```bash
# Run code analysis
snyk code test

# Include ignored issues in the report
snyk code test --include-ignores

# Output results as JSON
snyk code test --json

# Output results as SARIF (for GitHub integration)
snyk code test --sarif
```

#### Dependency Scanning
Scan for vulnerabilities in npm packages:

```bash
# Test dependencies
snyk test

# Test and monitor (sends results to Snyk dashboard)
snyk monitor

# Test with detailed output
snyk test --all-projects
```

### Common Commands

```bash
# Run security scan
snyk code test

# View all issues including ignored ones
snyk code test --include-ignores

# Test specific severity levels
snyk code test --severity-threshold=high

# Generate HTML report
snyk code test --sarif-file-output=snyk-report.sarif

# Check for open source vulnerabilities
snyk test

# Fix vulnerabilities automatically (where possible)
snyk fix
```

### CI/CD Integration

Add Snyk to your CI/CD pipeline:

```yaml
# GitHub Actions example
- name: Run Snyk Security Scan
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  with:
    command: code test
```

### Ignoring Issues

To ignore specific vulnerabilities:

1. **Via Snyk Web UI:** Visit https://app.snyk.io/ and manage ignores
2. **Via Policy File:** Add to `.snyk` file (for path-based exclusions)
3. **Via CLI:** Use `snyk ignore --id=<issue-id>` for specific findings

### Expected Results

With the current configuration:
- ✅ **Total issues: 0** (test files excluded)
- ✅ All test fixtures and mock data ignored
- ✅ Production code scanned for vulnerabilities

### Troubleshooting

**Issue:** "id is a required field for `snyk ignore`"
- **Solution:** Use `.snyk` policy file for directory exclusions instead of CLI

**Issue:** Test files showing hardcoded password warnings
- **Solution:** Already configured in `.snyk` - test directory is excluded

**Issue:** Authentication errors
- **Solution:** Run `snyk auth` to re-authenticate

### Documentation

- [Snyk CLI Documentation](https://docs.snyk.io/snyk-cli)
- [Snyk Code Documentation](https://docs.snyk.io/scan-with-snyk/snyk-code)
- [.snyk Policy File](https://docs.snyk.io/manage-risk/policies/the-.snyk-file)

## Snyk 

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Router](https://reactrouter.com/) - Routing library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

---

## 📞 Support

For detailed information, please check our [documentation](./docs/README.md).

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
