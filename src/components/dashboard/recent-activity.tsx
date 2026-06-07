"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getSentMatches } from "@/lib/sent-matches";

export default function RecentActivity() {
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    const matches = getSentMatches();

    const recent = matches
      .slice(0, 5)
      .map(
        (match) =>
          `Match sent between ${match.customerName} and ${match.matchName}`,
      );

    setActivities(recent);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 && (
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          )}

          {activities.map((activity) => (
            <div key={activity} className="text-sm">
              {activity}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
