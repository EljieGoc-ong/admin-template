import { useAgents } from "@/contexts/AgentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, PhoneCall, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

function StatusBadge({ status }: { status: string }) {
  const variant = status === "active" ? "default" : status === "error" ? "destructive" : "secondary";
  return <Badge variant={variant} className="capitalize">{status}</Badge>;
}

export default function Dashboard() {
  const { agents, callLogs } = useAgents();
  const activeAgents = agents.filter((a) => a.status === "active").length;
  const activeCalls = callLogs.filter((c) => c.status === "in-progress").length;
  const todayCalls = callLogs.filter((c) => c.startedAt.startsWith("2026-02-09")).length;
  const completedCalls = callLogs.filter((c) => c.status === "completed");
  const avgDuration = completedCalls.length
    ? Math.round(completedCalls.reduce((s, c) => s + c.duration, 0) / completedCalls.length)
    : 0;

  const stats = [
    { label: "Total Agents", value: agents.length, icon: Bot, accent: "text-primary" },
    { label: "Active Calls", value: activeCalls, icon: PhoneCall, accent: "text-green-500" },
    { label: "Calls Today", value: todayCalls, icon: TrendingUp, accent: "text-blue-400" },
    { label: "Avg Duration", value: `${Math.floor(avgDuration / 60)}m ${avgDuration % 60}s`, icon: Clock, accent: "text-amber-400" },
  ];

  const recentAgents = [...agents]
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recently Active Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAgents.map((agent) => (
              <Link
                key={agent.id}
                to={`/agents/${agent.id}`}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{agent.totalCalls} calls</span>
                  <StatusBadge status={agent.status} />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
