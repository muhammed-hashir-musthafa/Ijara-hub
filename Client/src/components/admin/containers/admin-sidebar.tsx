"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/base/ui/sidebar";
import { Button } from "@/components/base/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/base/ui/avatar";
import { Badge } from "@/components/base/ui/badge";
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Settings,
  FileText,
  Shield,
  LogOut,
  Database,
  Mail,
  CreditCard,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [pendingApprovals] = useState(8); // Mock pending approvals count

  const navigationItems = [
    {
      title: "System Overview",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      badge: "1,247",
    },
    {
      title: "Property Management",
      url: "/admin/properties",
      icon: Building2,
      badge: pendingApprovals > 0 ? pendingApprovals.toString() : undefined,
    },
    { title: "System Analytics", url: "/admin/analytics", icon: BarChart3 },
    { title: "Reports", url: "/admin/reports", icon: FileText },
  ];

  const systemItems = [
    { title: "System Settings", url: "/admin/settings", icon: Settings },
    { title: "Audit Logs", url: "/admin/audit", icon: Shield },
    { title: "Database", url: "/admin/database", icon: Database },
  ];

  const configItems = [
    { title: "Email Settings", url: "/admin/email", icon: Mail },
    { title: "Payment Settings", url: "/admin/payments", icon: CreditCard },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-foreground">
              Ijara Hub
            </span>
            <span className="text-xs text-muted-foreground">Admin Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            Platform Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full justify-start"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={
                            item.title === "Property Management" &&
                            pendingApprovals > 0
                              ? "destructive"
                              : "secondary"
                          }
                          className="ml-auto text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* System Administration */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            System Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full justify-start"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Configuration */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            Configuration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full justify-start"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {/* System Status */}
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Admin"
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              SA
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium text-sidebar-foreground truncate">
              Super Admin
            </span>
            <span className="text-xs text-muted-foreground truncate">
              admin@uaerentals.com
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
