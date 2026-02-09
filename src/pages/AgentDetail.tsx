import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAgents } from "@/contexts/AgentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { voiceTypes } from "@/data/mock-data";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAgent, updateAgent, getAgentCalls } = useAgents();
  const agent = getAgent(id!);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(agent ? { name: agent.name, description: agent.description, voiceType: agent.voiceType, greetingMessage: agent.greetingMessage, phoneNumber: agent.phoneNumber } : null);

  if (!agent || !form) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground">Agent not found</p>
        <Button variant="outline" onClick={() => navigate("/agents")}>Back to agents</Button>
      </div>
    );
  }

  const calls = getAgentCalls(agent.id);

  const handleSave = () => {
    updateAgent(agent.id, form);
    setEditing(false);
    toast.success("Agent updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/agents")}><ArrowLeft className="h-4 w-4" /></Button>
        <h1 className="text-2xl font-bold">{agent.name}</h1>
        <Badge variant={agent.status === "active" ? "default" : agent.status === "error" ? "destructive" : "secondary"} className="capitalize">{agent.status}</Badge>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Agent Configuration</CardTitle>
          {editing ? (
            <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
          ) : (
            <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              {editing ? <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /> : <p className="text-sm">{form.name}</p>}
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              {editing ? <Input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} /> : <p className="text-sm">{form.phoneNumber}</p>}
            </div>
            <div className="space-y-2">
              <Label>Voice Type</Label>
              {editing ? (
                <Select value={form.voiceType} onValueChange={(v) => setForm({ ...form, voiceType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{voiceTypes.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select>
              ) : <p className="text-sm">{form.voiceType}</p>}
            </div>
            <div className="space-y-2">
              <Label>Created</Label>
              <p className="text-sm text-muted-foreground">{new Date(agent.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              {editing ? <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /> : <p className="text-sm">{form.description}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Greeting Message</Label>
              {editing ? <Textarea value={form.greetingMessage} onChange={(e) => setForm({ ...form, greetingMessage: e.target.value })} /> : <p className="text-sm italic text-muted-foreground">"{form.greetingMessage}"</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Call History</CardTitle></CardHeader>
        <CardContent>
          {calls.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">No call history</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Caller</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>
                      <p className="font-medium">{call.callerName}</p>
                      <p className="text-xs text-muted-foreground">{call.callerNumber}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={call.status === "completed" ? "default" : call.status === "in-progress" ? "secondary" : "destructive"} className="capitalize">
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{call.duration > 0 ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s` : "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(call.startedAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
