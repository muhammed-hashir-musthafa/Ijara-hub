import type React from "react";
import { SidebarProvider, SidebarInset } from "@/components/base/ui/sidebar";
import { AdminSidebar } from "@/components/admin/containers/admin-sidebar";
import { AdminHeader } from "@/components/admin/containers/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 bg-muted/10">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
