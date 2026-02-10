import { User, SystemMetric, ActivityLog } from "@/types/admin";
import { Cpu, Database, HardDrive, Zap, Server, Users } from "lucide-react";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "Admin",
    status: "active",
    lastLogin: "2026-02-10 09:30:00",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    role: "Manager",
    status: "active",
    lastLogin: "2026-02-10 08:45:00",
    createdAt: "2025-03-20",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@company.com",
    role: "User",
    status: "inactive",
    lastLogin: "2026-02-08 14:20:00",
    createdAt: "2025-06-10",
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "Manager",
    status: "active",
    lastLogin: "2026-02-10 07:15:00",
    createdAt: "2025-04-05",
  },
];

export const mockSystemMetrics: SystemMetric[] = [
  {
    label: "CPU Usage",
    value: "45%",
    status: "healthy",
    icon: Cpu,
    trend: "+2%",
  },
  {
    label: "Memory Usage",
    value: "6.2 / 16 GB",
    status: "healthy",
    icon: Database,
    trend: "+0.5 GB",
  },
  {
    label: "Storage",
    value: "234 / 500 GB",
    status: "healthy",
    icon: HardDrive,
    trend: "+12 GB",
  },
  {
    label: "API Response",
    value: "142ms",
    status: "healthy",
    icon: Zap,
    trend: "-8ms",
  },
  {
    label: "Server Uptime",
    value: "99.98%",
    status: "healthy",
    icon: Server,
    trend: "stable",
  },
  {
    label: "Active Sessions",
    value: "1,247",
    status: "healthy",
    icon: Users,
    trend: "+89",
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    user: "john@company.com",
    action: "Created new user",
    resource: "User: support@company.com",
    timestamp: "2026-02-10 09:45:22",
    status: "success",
  },
  {
    id: "2",
    user: "jane@company.com",
    action: "Updated system settings",
    resource: "Settings: API Rate Limits",
    timestamp: "2026-02-10 09:30:15",
    status: "success",
  },
  {
    id: "3",
    user: "admin@company.com",
    action: "Failed login attempt",
    resource: "Auth: Multiple attempts detected",
    timestamp: "2026-02-10 09:15:08",
    status: "error",
  },
  {
    id: "4",
    user: "bob@company.com",
    action: "Deleted call log",
    resource: "Call Log ID: #12345",
    timestamp: "2026-02-10 09:00:45",
    status: "warning",
  },
  {
    id: "5",
    user: "alice@company.com",
    action: "Exported data report",
    resource: "Report: Monthly Analytics",
    timestamp: "2026-02-10 08:45:30",
    status: "success",
  },
];
