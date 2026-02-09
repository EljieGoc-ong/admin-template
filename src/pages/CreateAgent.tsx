import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgents } from "@/contexts/AgentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { voiceTypes } from "@/data/mock-data";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function CreateAgent() {
  const navigate = useNavigate();
  const { addAgent } = useAgents();
  const [form, setForm] = useState({
    name: "",
    description: "",
    voiceType: voiceTypes[0],
    greetingMessage: "",
    phoneNumber: "",
    status: "inactive" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phoneNumber) {
      toast.error("Name and phone number are required");
      return;
    }
    addAgent(form);
    toast.success("Agent created successfully");
    navigate("/agents");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/agents")}><ArrowLeft className="h-4 w-4" /></Button>
        <h1 className="text-2xl font-bold">Create Agent</h1>
      </div>

      <Card>
        <CardHeader><CardTitle>Agent Configuration</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sales Assistant" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label>Voice Type</Label>
              <Select value={form.voiceType} onValueChange={(v) => setForm({ ...form, voiceType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{voiceTypes.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What does this agent do?" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Greeting Message</Label>
              <Textarea value={form.greetingMessage} onChange={(e) => setForm({ ...form, greetingMessage: e.target.value })} placeholder="Hi! Thanks for calling…" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">Create Agent</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
