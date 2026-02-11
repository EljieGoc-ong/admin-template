# Complete Cursor Rules Index

This project has comprehensive AI rules organized across multiple files:

## 📁 Project Structure
- **Root**: `.cursorrules` - Main project rules file
- **Directory**: `.cursor/rules/` - 79+ organized rule files
- **Standards**: `.standards/` - Detailed project standards

---

## 🎯 Your Custom Project Rules (New)

### Core Project Rules
- `project-overview.md` - Admin template architecture & context
- `code-style.md` - TypeScript/React conventions
- `api.md` - API design & response formats
- `git-workflow.md` - Git commits & branching
- `testing.md` - Testing standards with Vitest
- `documentation.md` - JSDoc & README standards

### Feature-Specific Rules
- `rbac-permissions.md` - Role-based access control patterns
- `graphql.md` - Apollo Client & GraphQL integration
- `styling.md` - Tailwind CSS & shadcn/ui
- `README.md` - Rules directory documentation

---

## 🚀 Performance & Optimization Rules (Existing)

### JavaScript Performance
- `js-batch-dom-css.md` - Batch DOM/CSS operations
- `js-cache-function-results.md` - Function result caching
- `js-cache-property-access.md` - Property access optimization
- `js-cache-storage.md` - Storage caching strategies
- `js-combine-iterations.md` - Loop optimization
- `js-early-exit.md` - Early exit patterns
- `js-hoist-regexp.md` - RegExp optimization
- `js-index-maps.md` - Map indexing
- `js-length-check-first.md` - Length check optimization
- `js-min-max-loop.md` - Loop bounds optimization
- `js-set-map-lookups.md` - Set/Map performance
- `js-tosorted-immutable.md` - Immutable sorting

### React Rendering Optimization
- `rendering-activity.md` - Activity indicators
- `rendering-animate-svg-wrapper.md` - SVG animation
- `rendering-conditional-render.md` - Conditional rendering
- `rendering-content-visibility.md` - Content visibility
- `rendering-hoist-jsx.md` - JSX hoisting
- `rendering-hydration-no-flicker.md` - Hydration flicker fix
- `rendering-hydration-suppress-warning.md` - Suppress hydration warnings
- `rendering-svg-precision.md` - SVG precision
- `rendering-usetransition-loading.md` - useTransition loading

### Re-render Optimization
- `rerender-defer-reads.md` - Defer expensive reads
- `rerender-dependencies.md` - Dependency management
- `rerender-derived-state.md` - Derived state patterns
- `rerender-derived-state-no-effect.md` - Avoid effects for derived state
- `rerender-functional-setstate.md` - Functional setState
- `rerender-lazy-state-init.md` - Lazy state initialization
- `rerender-memo.md` - React.memo usage
- `rerender-memo-with-default-value.md` - Memo with defaults
- `rerender-move-effect-to-event.md` - Effect to event handler
- `rerender-simple-expression-in-memo.md` - Simple expressions in memo
- `rerender-transitions.md` - Transitions for performance
- `rerender-use-ref-transient-values.md` - useRef for transient values

### Bundle Optimization
- `bundle-barrel-imports.md` - Barrel import optimization
- `bundle-conditional.md` - Conditional loading
- `bundle-defer-third-party.md` - Defer third-party scripts
- `bundle-dynamic-imports.md` - Dynamic imports
- `bundle-preload.md` - Resource preloading

### Client-Side Optimization
- `client-event-listeners.md` - Event listener optimization
- `client-localstorage-schema.md` - localStorage schema
- `client-passive-event-listeners.md` - Passive event listeners
- `client-swr-dedup.md` - SWR deduplication

### Async Operations
- `async-api-routes.md` - API route patterns
- `async-defer-await.md` - Defer/await patterns
- `async-dependencies.md` - Async dependency management
- `async-parallel.md` - Parallel async operations
- `async-suspense-boundaries.md` - Suspense boundaries

### Server-Side Optimization
- `server-after-nonblocking.md` - Non-blocking operations
- `server-auth-actions.md` - Auth action patterns
- `server-cache-lru.md` - LRU caching
- `server-cache-react.md` - React caching
- `server-dedup-props.md` - Props deduplication
- `server-parallel-fetching.md` - Parallel fetching
- `server-serialization.md` - Serialization optimization

### Advanced Patterns
- `advanced-event-handler-refs.md` - Event handler refs
- `advanced-init-once.md` - Initialize once pattern
- `advanced-use-latest.md` - useLatest hook pattern

---

## 📋 Development Workflow Rules

- `commit-rules.md` - Commit message standards
- `pull-request-guidelines.md` - PR process
- `running-commands.md` - Command execution guidelines
- `deprecation-instructions.md` - Deprecation process
- `feature-flags.md` - Feature flag patterns

---

## 🏗️ Architecture & Standards

- `admin-filtering-pagination.md` - Admin UI patterns
- `admin-frontend.md` - Admin frontend rules
- `project-description.md` - Project description
- `api-standards.md` - API standards
- `creating-api-documentations.md` - API documentation

---

## 📚 Template Files

- `_template.md` - Rule template
- `_sections.md` - Section definitions

---

## 🔍 How to Use These Rules

### In Chat
Reference rules directly using `@` mentions:
```
@code-style help me create a component
@graphql create a user query
@rbac-permissions add permission checks
@js-cache-function-results optimize this function
```

### In Settings
1. Open **Settings > Rules**
2. All `.cursor/rules/*.md` files should be listed
3. They're automatically applied to AI context

### Testing
Ask: "What are the React performance optimization rules?" 
Cursor should reference the rendering and re-render rules.

---

## 📖 Additional Resources

### Detailed Standards (`.standards/` directory)
- `code_style_standards.md`
- `api_standards.md`
- `git_workflow_standards.md`
- `testing_standards.md`
- `database_standards.md`
- `model_design_standards.md`
- `documentation_standards.md`
- `feature_flags.md`
- `ai_standards.md`

### Project Documentation (`docs/` directory)
- `GRAPHQL_INTEGRATION.md`
- `PERMISSION_BASED_RBAC.md`
- `TEST_SUMMARY.md`

---

## ✅ Verification

Your Cursor rules setup is now complete with:
- ✅ `.cursorrules` root file (109 lines)
- ✅ 79 rule files in `.cursor/rules/`
- ✅ Project-specific rules for your admin template
- ✅ Performance optimization rules
- ✅ React best practices
- ✅ Development workflow guidelines

**Next Step**: Start a new chat and test with:
"What TypeScript conventions should I follow?"
