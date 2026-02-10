import { LayoutDashboard } from "lucide-react";

export function AuthLogo() {
  return (
    <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
        <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <p className="text-xs text-muted-foreground">Management System</p>
      </div>
    </div>
  );
}
