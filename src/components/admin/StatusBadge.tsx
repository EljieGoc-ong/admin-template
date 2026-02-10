import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { StatusType } from "@/types/admin";

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, { variant: any; label: string }> = {
    active: { variant: "default", label: "Active" },
    inactive: { variant: "secondary", label: "Inactive" },
    suspended: { variant: "destructive", label: "Suspended" },
    healthy: { variant: "default", label: "Healthy" },
    warning: { variant: "secondary", label: "Warning" },
    critical: { variant: "destructive", label: "Critical" },
    success: { variant: "default", label: "Success" },
    error: { variant: "destructive", label: "Error" },
  };
  
  const config = variants[status] || { variant: "secondary", label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

interface StatusIconProps {
  status: StatusType;
}

export function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case "healthy":
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "critical":
    case "error":
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return null;
  }
}
