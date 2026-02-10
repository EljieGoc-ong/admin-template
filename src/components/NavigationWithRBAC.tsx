/**
 * Navigation with Permission-Based filtering
 * Shows menu items based on user permissions
 */

import { NavLink } from "@/components/NavLink";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Activity, Shield, Settings, BarChart3, LucideIcon } from "lucide-react";
import { useRBAC } from "@/contexts/RBACContext";
import { NAVIGATION_ITEMS } from "@/config/permissions";

interface NavItemWithIcon {
  title: string;
  url: string;
  icon: LucideIcon;
  requiredPermissions: string[];
}

// Map icons to navigation items
const iconMap: Record<string, LucideIcon> = {
  '/': LayoutDashboard,
  '/users': Users,
  '/reports': BarChart3,
  '/monitoring': Activity,
  '/settings': Settings,
  '/admin': Shield,
};

export function NavigationWithRBAC() {
  const { hasAnyPermission } = useRBAC();

  // Filter navigation items based on permissions
  const visibleItems: NavItemWithIcon[] = NAVIGATION_ITEMS
    .filter(item => hasAnyPermission(item.requiredPermissions))
    .map(item => ({
      ...item,
      icon: iconMap[item.url] || LayoutDashboard
    }));

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {visibleItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  activeClassName="bg-sidebar-accent text-primary font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
