"use client"

import type React from "react"
import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/base/ui/sidebar"
  import type { Language } from "@/lib/i18n"
import { AdminSidebar } from "@/components/admin/containers/admin-sidebar"
import { AdminHeader } from "@/components/admin/containers/admin-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [lang, setLang] = useState<Language>("en")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar lang={lang} />
        <SidebarInset className="flex flex-1 flex-col">
          <AdminHeader lang={lang} onLanguageChange={setLang} />
          <main className="flex-1 p-6 bg-muted/10">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
