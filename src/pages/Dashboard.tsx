import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, TrendingUp, Clock } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Total Users", value: "2,643", icon: Users, accent: "text-primary" },
    { label: "Active Sessions", value: "127", icon: Activity, accent: "text-green-500" },
    { label: "Growth", value: "+12.5%", icon: TrendingUp, accent: "text-blue-400" },
    { label: "Avg. Session", value: "4m 32s", icon: Clock, accent: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-4 w-4 ${s.accent}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">User registered</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Report generated</p>
                  <p className="text-xs text-muted-foreground">Monthly analytics</p>
                </div>
                <span className="text-xs text-muted-foreground">15 min ago</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Settings updated</p>
                  <p className="text-xs text-muted-foreground">System configuration</p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Server</span>
                <span className="text-sm font-medium text-green-500">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="text-sm font-medium text-green-500">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cache</span>
                <span className="text-sm font-medium text-green-500">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <span className="text-sm font-medium text-amber-500">Degraded</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
