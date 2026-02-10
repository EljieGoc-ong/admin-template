import { LayoutDashboard, Users, TrendingUp, Shield, Zap, LucideIcon, Lock } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: "User Management",
    description: "Complete control over users, roles and permissions"
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    description: "Advanced RBAC system for secure access control"
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Monitor system metrics and user activity"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and data protection"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance and reliability"
  }
];

export function AuthFeaturePanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
            <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">Management System</p>
          </div>
        </div>

        <div className="space-y-6 mt-16">
          <h3 className="text-3xl font-bold leading-tight">
            Manage your system<br />with confidence
          </h3>
          <p className="text-lg text-muted-foreground">
            Access powerful tools to monitor, manage users, and control your system with role-based permissions.
          </p>

          <div className="grid gap-4 mt-12">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 text-sm text-muted-foreground">
        <p>&copy; 2026 Admin Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
}
