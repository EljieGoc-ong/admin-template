# Testing Standards & Rules

## Testing Framework
- **Test Runner**: Vitest
- **Testing Library**: @testing-library/react
- **Location**: `src/test/`

## General Testing Rules
1. **ALWAYS** add tests for critical UI logic and utilities
2. **ALWAYS** run lint and validation checks before committing
3. Keep tests deterministic - avoid network calls in unit tests
4. Cover critical user flows with component tests
5. Test behavior, not implementation details

## Frontend Testing
- Prefer component tests for UI behavior
- Cover critical utilities with unit tests
- Test user interactions and state changes
- Mock external dependencies (API calls, GraphQL)

### Component Test Example
```typescript
// ✅ GOOD - Testing behavior
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from '@/components/UserProfile';

describe('UserProfile', () => {
  it('displays user information when loaded', () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });

  it('calls onUpdate when save button is clicked', () => {
    const onUpdate = vi.fn();
    render(<UserProfile userId="123" onUpdate={onUpdate} />);
    
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onUpdate).toHaveBeenCalled();
  });
});
```

## Unit Testing
Test pure functions and utilities:
```typescript
// src/utils/formatters.test.ts
import { formatUserName } from './formatters';

describe('formatUserName', () => {
  it('formats full name correctly', () => {
    expect(formatUserName('John', 'Doe')).toBe('John Doe');
  });

  it('handles missing last name', () => {
    expect(formatUserName('John', undefined)).toBe('John');
  });
});
```

## Mocking GraphQL
```typescript
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: GET_USER_QUERY,
      variables: { id: '123' },
    },
    result: {
      data: {
        user: { id: '123', name: 'John Doe' },
      },
    },
  },
];

render(
  <MockedProvider mocks={mocks}>
    <UserComponent userId="123" />
  </MockedProvider>
);
```

## Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- UserProfile.test.tsx
```

## Test Organization
```
src/
  test/
    config/          # Test configuration
    services/        # Service tests
    setup.ts         # Test setup file
  components/
    UserProfile.tsx
    UserProfile.test.tsx  # Co-located component tests
```

## What to Test
✅ **DO Test:**
- User interactions and flows
- State changes and side effects
- Conditional rendering
- Error states and edge cases
- Critical utility functions
- Permission checks and RBAC logic

❌ **DON'T Test:**
- Third-party library implementation
- Trivial getters/setters
- Static content
- Styling details

## Reference
See `.standards/testing_standards.md` for complete details.
