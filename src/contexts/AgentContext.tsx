import { createContext, useContext, useState, ReactNode } from "react";
import { Agent, CallLog, mockAgents, mockCallLogs } from "@/data/mock-data";

interface AgentContextType {
  agents: Agent[];
  callLogs: CallLog[];
  addAgent: (agent: Omit<Agent, "id" | "totalCalls" | "lastActive" | "createdAt">) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  toggleAgentStatus: (id: string) => void;
  getAgent: (id: string) => Agent | undefined;
  getAgentCalls: (id: string) => CallLog[];
}

const AgentContext = createContext<AgentContextType | null>(null);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [callLogs] = useState<CallLog[]>(mockCallLogs);

  const addAgent = (data: Omit<Agent, "id" | "totalCalls" | "lastActive" | "createdAt">) => {
    const newAgent: Agent = {
      ...data,
      id: String(Date.now()),
      totalCalls: 0,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setAgents((prev) => [...prev, newAgent]);
  };

  const updateAgent = (id: string, updates: Partial<Agent>) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAgent = (id: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleAgentStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a
      )
    );
  };

  const getAgent = (id: string) => agents.find((a) => a.id === id);
  const getAgentCalls = (id: string) => callLogs.filter((c) => c.agentId === id);

  return (
    <AgentContext.Provider value={{ agents, callLogs, addAgent, updateAgent, deleteAgent, toggleAgentStatus, getAgent, getAgentCalls }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgents must be used within AgentProvider");
  return ctx;
}
