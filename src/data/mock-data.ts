export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "error";
  phoneNumber: string;
  voiceType: string;
  greetingMessage: string;
  totalCalls: number;
  lastActive: string;
  createdAt: string;
}

export interface CallLog {
  id: string;
  agentId: string;
  agentName: string;
  callerNumber: string;
  callerName: string;
  duration: number; // seconds
  status: "completed" | "in-progress" | "missed" | "failed";
  startedAt: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Sales Assistant",
    description: "Handles inbound sales inquiries and qualifies leads.",
    status: "active",
    phoneNumber: "+1 (555) 100-2001",
    voiceType: "Female — Warm",
    greetingMessage: "Hi! Thanks for calling. How can I help you today?",
    totalCalls: 1243,
    lastActive: "2026-02-09T14:32:00Z",
    createdAt: "2025-11-01T09:00:00Z",
  },
  {
    id: "2",
    name: "Support Bot",
    description: "Provides tier-1 technical support and escalates complex issues.",
    status: "active",
    phoneNumber: "+1 (555) 100-2002",
    voiceType: "Male — Professional",
    greetingMessage: "Hello, you've reached support. What issue are you experiencing?",
    totalCalls: 876,
    lastActive: "2026-02-09T13:10:00Z",
    createdAt: "2025-12-15T10:00:00Z",
  },
  {
    id: "3",
    name: "Appointment Scheduler",
    description: "Books and manages appointments for clinic patients.",
    status: "inactive",
    phoneNumber: "+1 (555) 100-2003",
    voiceType: "Female — Friendly",
    greetingMessage: "Welcome! I can help you schedule or manage your appointment.",
    totalCalls: 412,
    lastActive: "2026-02-07T09:45:00Z",
    createdAt: "2026-01-05T08:00:00Z",
  },
  {
    id: "4",
    name: "Billing Agent",
    description: "Answers billing questions and processes payment issues.",
    status: "error",
    phoneNumber: "+1 (555) 100-2004",
    voiceType: "Male — Calm",
    greetingMessage: "Hi there, I can help with billing. What's your account number?",
    totalCalls: 98,
    lastActive: "2026-02-08T16:20:00Z",
    createdAt: "2026-01-20T11:00:00Z",
  },
  {
    id: "5",
    name: "Feedback Collector",
    description: "Calls customers to collect NPS and satisfaction feedback.",
    status: "active",
    phoneNumber: "+1 (555) 100-2005",
    voiceType: "Female — Cheerful",
    greetingMessage: "Hi! We'd love to hear about your recent experience with us.",
    totalCalls: 2310,
    lastActive: "2026-02-09T15:00:00Z",
    createdAt: "2025-10-10T07:00:00Z",
  },
];

export const mockCallLogs: CallLog[] = [
  { id: "c1", agentId: "1", agentName: "Sales Assistant", callerNumber: "+1 (555) 800-1001", callerName: "John Miller", duration: 245, status: "completed", startedAt: "2026-02-09T14:30:00Z", sentiment: "positive" },
  { id: "c2", agentId: "1", agentName: "Sales Assistant", callerNumber: "+1 (555) 800-1002", callerName: "Sarah Chen", duration: 120, status: "completed", startedAt: "2026-02-09T13:15:00Z", sentiment: "neutral" },
  { id: "c3", agentId: "2", agentName: "Support Bot", callerNumber: "+1 (555) 800-1003", callerName: "David Park", duration: 0, status: "in-progress", startedAt: "2026-02-09T15:02:00Z" },
  { id: "c4", agentId: "2", agentName: "Support Bot", callerNumber: "+1 (555) 800-1004", callerName: "Emily Ross", duration: 340, status: "completed", startedAt: "2026-02-09T12:40:00Z", sentiment: "negative" },
  { id: "c5", agentId: "5", agentName: "Feedback Collector", callerNumber: "+1 (555) 800-1005", callerName: "Alex Turner", duration: 0, status: "in-progress", startedAt: "2026-02-09T14:58:00Z" },
  { id: "c6", agentId: "4", agentName: "Billing Agent", callerNumber: "+1 (555) 800-1006", callerName: "Maria Lopez", duration: 45, status: "failed", startedAt: "2026-02-08T16:18:00Z", sentiment: "negative" },
  { id: "c7", agentId: "3", agentName: "Appointment Scheduler", callerNumber: "+1 (555) 800-1007", callerName: "Robert Kim", duration: 180, status: "completed", startedAt: "2026-02-07T09:30:00Z", sentiment: "positive" },
  { id: "c8", agentId: "1", agentName: "Sales Assistant", callerNumber: "+1 (555) 800-1008", callerName: "Lisa Wang", duration: 0, status: "missed", startedAt: "2026-02-09T11:00:00Z" },
  { id: "c9", agentId: "5", agentName: "Feedback Collector", callerNumber: "+1 (555) 800-1009", callerName: "James Brown", duration: 95, status: "completed", startedAt: "2026-02-09T14:00:00Z", sentiment: "positive" },
  { id: "c10", agentId: "2", agentName: "Support Bot", callerNumber: "+1 (555) 800-1010", callerName: "Nina Patel", duration: 210, status: "completed", startedAt: "2026-02-09T10:30:00Z", sentiment: "neutral" },
];

export const voiceTypes = [
  "Female — Warm",
  "Female — Friendly",
  "Female — Cheerful",
  "Female — Professional",
  "Male — Professional",
  "Male — Calm",
  "Male — Energetic",
  "Male — Friendly",
];
