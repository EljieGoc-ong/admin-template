export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdAt: string;
}

export interface SystemMetric {
  label: string;
  value: string;
  status: "healthy" | "warning" | "critical";
  icon: any;
  trend?: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  status: "success" | "warning" | "error";
}

export type StatusType = "active" | "inactive" | "suspended" | "healthy" | "warning" | "critical" | "success" | "error";
