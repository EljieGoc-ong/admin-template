import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Users, Server, Settings, Activity, Download, RefreshCw, BarChart3 } from "lucide-react";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { UsersTab } from "@/components/admin/UsersTab";
import { SystemTab } from "@/components/admin/SystemTab";
import { SettingsTab } from "@/components/admin/SettingsTab";
import { ActivityTab } from "@/components/admin/ActivityTab";
import { mockUsers, mockSystemMetrics, mockActivityLogs } from "@/data/mockAdminData";

export default function GlobalAdmin() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Global Admin
          </h1>
          <p className="text-muted-foreground mt-1">
            System administration and configuration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2">
            <Server className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab systemMetrics={mockSystemMetrics} />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab users={mockUsers} />
        </TabsContent>

        <TabsContent value="system">
          <SystemTab />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab activityLogs={mockActivityLogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
