# Styling & UI Component Rules

## Styling Framework
- **Primary**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React (via shadcn/ui)

## Tailwind CSS Rules
1. **ALWAYS** use Tailwind classes consistently with existing patterns
2. **NEVER** use inline styles unless absolutely necessary
3. Follow responsive design patterns with Tailwind breakpoints
4. Use Tailwind utility classes over custom CSS

### Responsive Design
```typescript
// ✅ GOOD - Tailwind responsive classes
<div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
  <div className="w-full md:w-1/2">Content</div>
  <div className="w-full md:w-1/2">Content</div>
</div>
```

### Avoid Inline Styles
```typescript
// ❌ BAD
<div style={{ padding: '16px', backgroundColor: '#fff' }}>Content</div>

// ✅ GOOD
<div className="p-4 bg-white">Content</div>
```

## shadcn/ui Components
Follow shadcn/ui component conventions located in `src/components/ui/`:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const MyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
};
```

## Color Palette
Use Tailwind's built-in color palette and custom theme colors:
- Primary actions: `bg-primary`, `text-primary`
- Secondary actions: `bg-secondary`, `text-secondary`
- Destructive actions: `bg-destructive`, `text-destructive`
- Muted/subtle: `bg-muted`, `text-muted-foreground`
- Borders: `border-border`

## Spacing & Layout
Use consistent spacing scale:
- `gap-2`, `gap-4`, `gap-6`, `gap-8` for flex/grid gaps
- `p-2`, `p-4`, `p-6`, `p-8` for padding
- `m-2`, `m-4`, `m-6`, `m-8` for margins
- `space-y-4`, `space-x-4` for child spacing

## Typography
```typescript
// Headings
<h1 className="text-3xl font-bold">Main Title</h1>
<h2 className="text-2xl font-semibold">Section Title</h2>
<h3 className="text-xl font-medium">Subsection Title</h3>

// Body text
<p className="text-base">Regular text</p>
<p className="text-sm text-muted-foreground">Secondary text</p>
```

## Component Composition
Build reusable components following existing patterns:

```typescript
import type { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
};
```

## Dark Mode Support
Use Tailwind's dark mode classes when applicable:
```typescript
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

## Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure sufficient color contrast
- Support keyboard navigation

```typescript
<Button
  variant="outline"
  aria-label="Close dialog"
  onClick={handleClose}
>
  <X className="h-4 w-4" />
</Button>
```

## Class Utility Function
Use `cn` utility for conditional classes:

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  className
)}>
  Content
</div>
```

## Styling Rules Summary
1. Use Tailwind CSS classes consistently
2. Follow shadcn/ui component patterns
3. Avoid inline styles
4. Maintain responsive design
5. Use consistent spacing scale
6. Support dark mode when applicable
7. Ensure accessibility standards
