import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, Database, Zap, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Monitoring() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUptime((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = () => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const services = [
    { name: "API Server", status: "online", latency: "45ms", uptime: "99.9%" },
    { name: "Database", status: "online", latency: "12ms", uptime: "99.8%" },
    { name: "Cache Server", status: "online", latency: "3ms", uptime: "100%" },
    { name: "Storage", status: "degraded", latency: "180ms", uptime: "98.5%" },
  ];

  const metrics = [
    { label: "CPU Usage", value: "42%", trend: "+2%", icon: Zap },
    { label: "Memory", value: "68%", trend: "-5%", icon: Activity },
    { label: "Disk I/O", value: "1.2 GB/s", trend: "+12%", icon: Database },
    { label: "Network", value: "450 Mb/s", trend: "+8%", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Monitoring</h1>
        <p className="text-muted-foreground">Real-time system health and performance metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.trend} from last hour</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Service Status</CardTitle>
              <Badge variant="default" className="text-xs">
                All Systems
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`h-2 w-2 rounded-full ${service.status === "online" ? "bg-green-500" : "bg-amber-500"}`} />
                      {service.status === "online" && (
                        <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-green-500/50" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">Latency: {service.latency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={service.status === "online" ? "default" : "secondary"} className="text-xs capitalize">
                      {service.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{service.uptime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-6">
                <Server className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p className="text-3xl font-bold font-mono">{formatUptime()}</p>
                <p className="text-sm text-muted-foreground mt-2">Current Session</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold">99.8%</p>
                  <p className="text-xs text-muted-foreground">30 Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-xs text-muted-foreground">12 Months</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Events</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">System backup completed</p>
                <p className="text-xs text-muted-foreground">Database backup finished successfully</p>
              </div>
              <Badge variant="default" className="text-xs">Success</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">High memory usage detected</p>
                <p className="text-xs text-muted-foreground">Memory usage reached 85%</p>
              </div>
              <Badge variant="secondary" className="text-xs">Warning</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Cache cleared</p>
                <p className="text-xs text-muted-foreground">System cache purged manually</p>
              </div>
              <Badge variant="outline" className="text-xs">Info</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
