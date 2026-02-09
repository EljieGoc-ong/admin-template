import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AgentProvider } from "@/contexts/AgentContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import AgentsList from "@/pages/AgentsList";
import AgentDetail from "@/pages/AgentDetail";
import CreateAgent from "@/pages/CreateAgent";
import Monitoring from "@/pages/Monitoring";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

function DarkModeInit() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AgentProvider>
          <DarkModeInit />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
              <Route path="/agents" element={<ProtectedRoute><AppLayout><AgentsList /></AppLayout></ProtectedRoute>} />
              <Route path="/agents/new" element={<ProtectedRoute><AppLayout><CreateAgent /></AppLayout></ProtectedRoute>} />
              <Route path="/agents/:id" element={<ProtectedRoute><AppLayout><AgentDetail /></AppLayout></ProtectedRoute>} />
              <Route path="/monitoring" element={<ProtectedRoute><AppLayout><Monitoring /></AppLayout></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AgentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
