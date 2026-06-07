"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Send,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HeartHandshake,
  Menu,
} from "lucide-react";

import { logout } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    label: "Sent Matches",
    href: "/sent-matches",
    icon: Send,
  },
];

export default function AppSidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <HeartHandshake className="h-6 w-6" />

          {!collapsed && (
            <div>
              <p className="font-semibold">TDC CRM</p>

              <p className="text-xs text-muted-foreground">
                Matchmaker Dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />

                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />

          {!collapsed && "Logout"}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden border-r bg-background transition-all duration-300 md:flex md:flex-col ${
          collapsed ? "w-[80px]" : "w-[260px]"
        }`}
      >
        <div className="absolute right-[-14px] top-5 z-20">
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 rounded-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <SidebarContent />
      </aside>

      {/* Mobile Menu */}
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <div className="flex h-full flex-col">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
