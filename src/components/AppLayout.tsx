import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavigationWithRBAC } from "@/components/NavigationWithRBAC";
import { LayoutDashboard, LogOut } from "lucide-react";
import { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-sidebar-border bg-sidebar">
          <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">Admin Dashboard</span>
          </div>
          <SidebarContent className="pt-2">
            <NavigationWithRBAC />
          </SidebarContent>
          <div className="mt-auto border-t border-sidebar-border">
            {user && (
              <div className="p-3 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.permissions.length} permission{user.permissions.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="p-2">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <header className="flex h-14 items-center border-b border-border px-4">
            <SidebarTrigger />
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
