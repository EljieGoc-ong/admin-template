import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAgents } from "@/contexts/AgentContext";

export default function Monitoring() {
  const { callLogs, agents } = useAgents();
  const activeCalls = callLogs.filter((c) => c.status === "in-progress");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = () => {
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Live Monitoring</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeCalls.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{agents.filter((a) => a.status === "active").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">99.8%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Active Calls</CardTitle></CardHeader>
        <CardContent>
          {activeCalls.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No active calls right now</p>
          ) : (
            <div className="space-y-3">
              {activeCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-primary/50" />
                    </div>
                    <div>
                      <p className="font-medium">{call.callerName}</p>
                      <p className="text-xs text-muted-foreground">{call.callerNumber}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{call.agentName}</p>
                    <Badge variant="secondary" className="text-xs">Handling</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-bold text-primary">{formatDuration()}</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent Completed Calls</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {callLogs
              .filter((c) => c.status === "completed")
              .slice(0, 5)
              .map((call) => (
                <div key={call.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{call.callerName}</p>
                    <p className="text-xs text-muted-foreground">{call.agentName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {call.sentiment && (
                      <Badge variant={call.sentiment === "positive" ? "default" : call.sentiment === "negative" ? "destructive" : "secondary"} className="capitalize text-xs">
                        {call.sentiment}
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">{Math.floor(call.duration / 60)}m {call.duration % 60}s</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
