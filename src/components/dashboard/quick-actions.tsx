"use client";

import { useRouter } from "next/navigation";

import { Users, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "View Customers",
    description: "Browse and manage customer profiles",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Generate Matches",
    description: "Start reviewing compatibility suggestions",
    icon: Sparkles,
    href: "/customers",
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                onClick={() => router.push(action.href)}
                className="rounded-xl border p-4 text-left transition-all hover:bg-muted"
              >
                <Icon className="mb-3 h-5 w-5" />

                <h4 className="font-medium">{action.title}</h4>

                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
