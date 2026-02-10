import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Globe, Mail } from "lucide-react";
import { SystemMetric } from "@/types/admin";
import { StatusBadge, StatusIcon } from "./StatusBadge";

interface OverviewTabProps {
  systemMetrics: SystemMetric[];
}

export function OverviewTab({ systemMetrics }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {systemMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  {metric.trend && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.trend}
                    </p>
                  )}
                </div>
                <StatusIcon status={metric.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time system status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">API Server</span>
              </div>
              <StatusBadge status="healthy" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Database</span>
              </div>
              <StatusBadge status="healthy" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">CDN</span>
              </div>
              <StatusBadge status="healthy" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Email Service</span>
              </div>
              <StatusBadge status="healthy" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Users</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Sessions</span>
              <span className="font-semibold">892</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Calls</span>
              <span className="font-semibold">45,123</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Error Rate</span>
              <span className="font-semibold">0.02%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
