

# AI Call Assistant Admin Panel

A dark-themed admin dashboard for managing AI call assistant agents, with authentication and live monitoring capabilities.

## Pages & Features

### 1. Login Page (`/auth`)
- Dark, modern login form with email/password fields
- Support for both **login** and **sign up** flows
- Sleek card-based design with subtle gradients and accent colors
- Mock authentication (no backend) — stores auth state in memory/localStorage

### 2. Dashboard Home (`/`)
- Overview cards showing key stats: total agents, active calls, calls today, average call duration
- A quick-glance list of recently active agents
- Protected route — redirects to login if not authenticated

### 3. Agents List (`/agents`)
- Table/grid view of all AI call assistant agents
- Each agent shows: name, status (active/inactive/error), phone number, total calls, last active time
- Search and filter by status
- Actions: view details, edit, delete, toggle active/inactive

### 4. Agent Detail / Edit (`/agents/:id`)
- Full agent profile: name, description, voice settings, greeting message, phone number
- Edit form to update agent configuration
- Call history log for that specific agent

### 5. Create Agent (`/agents/new`)
- Form to create a new agent with fields: name, description, voice type, greeting message, assigned phone number
- Validation and success feedback

### 6. Live Monitoring (`/monitoring`)
- Dashboard showing simulated real-time call activity
- Active calls list with caller info, agent name, duration, status
- Visual indicators (pulsing dots, color-coded statuses)

## Layout & Navigation
- Collapsible sidebar with icons for: Dashboard, Agents, Monitoring, and Logout
- Dark theme throughout with accent colors (e.g., blue/purple highlights)
- Responsive design for desktop use

## Data Approach
- All data is **mock/static** — hardcoded sample agents, calls, and stats
- No backend required; auth is simulated with local state

