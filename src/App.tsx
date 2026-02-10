import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/config/apollo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RBACProvider } from "@/contexts/RBACContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RouteGuard } from "@/components/guards/RouteGuard";
import { AppLayout } from "@/components/AppLayout";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import Monitoring from "@/pages/Monitoring";
import GlobalAdmin from "@/pages/GlobalAdmin";
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
  <ApolloProvider client={apolloClient}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <RBACProvider>
            <DarkModeInit />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><RouteGuard><AppLayout><Dashboard /></AppLayout></RouteGuard></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><RouteGuard><AppLayout><Dashboard /></AppLayout></RouteGuard></ProtectedRoute>} />
                <Route path="/monitoring" element={<ProtectedRoute><RouteGuard><AppLayout><Monitoring /></AppLayout></RouteGuard></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><RouteGuard><AppLayout><Dashboard /></AppLayout></RouteGuard></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><RouteGuard><AppLayout><GlobalAdmin /></AppLayout></RouteGuard></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </RBACProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ApolloProvider>
);

export default App;
