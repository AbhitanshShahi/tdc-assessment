"use client";

import { useState } from "react";

import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
