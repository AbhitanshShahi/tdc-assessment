"use client";

import { useEffect, useState } from "react";

import { customers } from "@/data/customers";

import { getDashboardStats } from "@/lib/sent-matches";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, HeartHandshake, Mail, Clock3 } from "lucide-react";

export default function StatsCards() {
  const [stats, setStats] = useState({
    matchesSent: 0,
    interested: 0,
    followUps: 0,
  });

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  const cards = [
    {
      title: "Active Clients",
      value: customers.length,
      icon: Users,
    },
    {
      title: "Matches Sent",
      value: stats.matchesSent,
      icon: Mail,
    },
    {
      title: "Interested",
      value: stats.interested,
      icon: HeartHandshake,
    },
    {
      title: "Follow Ups",
      value: stats.followUps,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>

            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
