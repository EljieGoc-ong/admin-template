import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SystemTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Server Information</CardTitle>
            <CardDescription>Current server status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Server Version</Label>
              <p className="font-mono text-sm">v2.4.1</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-muted-foreground">Deployment</Label>
              <p className="font-mono text-sm">Production</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-muted-foreground">Last Updated</Label>
              <p className="font-mono text-sm">2026-02-08 14:30:00 UTC</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-muted-foreground">Region</Label>
              <p className="font-mono text-sm">US-East-1</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database</CardTitle>
            <CardDescription>Database configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Type</Label>
              <p className="font-mono text-sm">PostgreSQL 15.2</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-muted-foreground">Total Size</Label>
              <p className="font-mono text-sm">42.7 GB</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-muted-foreground">Tables</Label>
              <p className="font-mono text-sm">87</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-muted-foreground">Backup</Label>
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm">Last: 2 hours ago</p>
                <Button variant="outline" size="sm">
                  Backup Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
          <CardDescription>System operations and maintenance tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Clear Cache</p>
              <p className="text-sm text-muted-foreground">
                Clear application cache to free up memory
              </p>
            </div>
            <Button variant="outline">Clear Cache</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Restart Services</p>
              <p className="text-sm text-muted-foreground">
                Restart all application services
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Restart</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Restart Services?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will temporarily interrupt service for all users.
                    Estimated downtime: 30-60 seconds.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Restart Now</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Run Diagnostics</p>
              <p className="text-sm text-muted-foreground">
                Perform system health check
              </p>
            </div>
            <Button variant="outline">Run Check</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
