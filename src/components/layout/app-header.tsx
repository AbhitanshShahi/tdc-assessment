"use client";

import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/customers": "Customers",
  "/sent-matches": "Sent Matches",
};

export default function AppHeader() {
  const pathname = usePathname();

  const title = titles[pathname] ?? "Matchmaker Dashboard";

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left */}
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Input placeholder="Search..." className="hidden w-64 md:flex" />

          <Avatar>
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
