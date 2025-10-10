"use client";

import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Badge } from "@/components/base/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/base/ui/sidebar";
import { Bell, Search, AlertTriangle, Activity } from "lucide-react";

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title = "Admin Dashboard" }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-6">
      <SidebarTrigger />

      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>

        <div className="relative ml-auto max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users, properties, logs..."
            className="pl-9 bg-input border-border focus:ring-primary"
          />
        </div>

        <Button variant="ghost" size="sm" className="gap-2">
          <Activity className="h-4 w-4 text-accent" />
          <span className="text-sm">System Healthy</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <AlertTriangle className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive">
                2
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>System Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-destructive">
                  High CPU Usage
                </span>
                <span className="text-xs text-muted-foreground">
                  Server load at 85% - investigate immediately
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-amber-600">
                  Pending Approvals
                </span>
                <span className="text-xs text-muted-foreground">
                  8 properties awaiting approval
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-primary">
                5
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Admin Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                  New user registration
                </span>
                <span className="text-xs text-muted-foreground">
                  Sarah Johnson registered as property owner
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Property reported</span>
                <span className="text-xs text-muted-foreground">
                  Luxury Suite in Dubai Marina flagged for review
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Payment dispute</span>
                <span className="text-xs text-muted-foreground">
                  Booking #12345 requires admin intervention
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
