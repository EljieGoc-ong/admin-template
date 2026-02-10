# Test Directory

This directory contains all unit tests for the admin template project.

## Directory Structure

```
src/test/
├── config/                  # Tests for configuration files
│   └── permissions.test.ts  # Permission helpers tests
├── services/                # Tests for business logic services
│   ├── admin/              
│   │   └── adminService.test.ts
│   ├── auth/
│   │   └── authService.test.ts
│   ├── rbac/
│   │   └── rbacService.test.ts
│   ├── storage/
│   │   └── storageService.test.ts
│   └── validation/
│       └── validationService.test.ts
├── example.test.ts          # Example test file
└── setup.ts                 # Test environment setup
```

## Organization Principle

Tests are organized to mirror the source code structure:
- **Source**: `src/services/auth/authService.ts`
- **Test**: `src/test/services/auth/authService.test.ts`

This makes it easy to:
- Locate tests for any given module
- Maintain consistency
- Navigate between source and test files

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run specific test file
npx vitest run src/test/services/auth/authService.test.ts

# Run tests for a specific directory
npx vitest run src/test/services/
```

## Test Coverage

| Module | Tests | Status |
|--------|-------|--------|
| Validation Service | 44 | ✅ |
| RBAC Service | 49 | ✅ |
| Auth Service | 39 | ✅ |
| Storage Service | 38 | ✅ |
| Admin Service | 28 | ✅ |
| Permission Helpers | 20 | ✅ |
| **Total** | **219** | ✅ |

## Writing New Tests

When adding new tests:

1. **Create test file** in the appropriate subdirectory matching the source structure
2. **Name the file** with `.test.ts` suffix (e.g., `myService.test.ts`)
3. **Import from source** using absolute paths with `@/` alias:
   ```typescript
   import { myService } from '@/services/myService';
   ```
4. **Follow existing patterns** for consistency

### Example Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { myService } from '@/services/myService';

describe('MyService', () => {
  describe('methodName', () => {
    it('should do something when condition', () => {
      const result = myService.methodName();
      expect(result).toBe(expectedValue);
    });

    it('should handle error case', () => {
      expect(() => myService.methodName(invalidInput)).toThrow();
    });
  });
});
```

## Test Configuration

Test configuration is set in:
- **`vitest.config.ts`** - Main test configuration
- **`src/test/setup.ts`** - Test environment setup (jsdom, polyfills)

## Debugging Tests

```bash
# Run tests with verbose output
npx vitest run --reporter=verbose

# Run tests with UI
npx vitest --ui

# Run specific test with debugging
node --inspect-brk ./node_modules/.bin/vitest run path/to/test.ts
```

## Best Practices

1. ✅ **Test behavior, not implementation** - Focus on what the code does, not how
2. ✅ **One assertion concept per test** - Keep tests focused and clear
3. ✅ **Use descriptive test names** - "should [expected behavior] when [condition]"
4. ✅ **Mock external dependencies** - Keep tests isolated and fast
5. ✅ **Test edge cases** - Empty values, null, undefined, boundary conditions
6. ✅ **Avoid test interdependencies** - Each test should be independent
7. ✅ **Keep tests fast** - Mock slow operations, avoid unnecessary delays

## Common Issues

### Import Errors
If you see "Failed to resolve import" errors, ensure:
- Paths use the `@/` alias
- The target file exists
- TypeScript configuration is correct

### Async Tests Timing Out
If async tests timeout:
- Increase timeout in test: `it('test name', async () => { ... }, 10000)`
- Ensure promises are properly awaited
- Check for unhandled rejections

### Mock Not Working
If mocks aren't being applied:
- Ensure `vi.mock()` is called before imports
- Clear mocks in `beforeEach()` if needed
- Verify mock path matches import path

## Contributing

When contributing tests:
1. Ensure all new business logic has corresponding tests
2. Maintain >80% code coverage for critical paths
3. Follow the existing test structure and patterns
4. Update this README if adding new test categories

---

For more details, see [TEST_SUMMARY.md](../../TEST_SUMMARY.md) in the project root.
