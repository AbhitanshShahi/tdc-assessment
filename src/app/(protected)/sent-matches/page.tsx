"use client";

import { useEffect, useState } from "react";
import { getSentMatches } from "@/lib/sent-matches";
import { SentMatch } from "@/types/sent-match";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateMatchStatus } from "@/lib/sent-matches";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SentMatchesPage() {
  const [matches, setMatches] = useState<SentMatch[]>([]);
  const statusColor = {
    Sent: "border border-blue-200 bg-blue-100 text-blue-700",

    Interested: "border border-green-200 bg-green-100 text-green-700",

    "Follow Up Needed":
      "border border-yellow-200 bg-yellow-100 text-yellow-700",
  };

  useEffect(() => {
    setMatches(getSentMatches());
  }, []);

  const handleStatusChange = (
    id: string,
    status: "Sent" | "Interested" | "Follow Up Needed",
  ) => {
    const updated = updateMatchStatus(id, status);

    setMatches(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sent Matches</h1>

        <p className="text-muted-foreground">
          Track previously sent match recommendations.
        </p>
      </div>

      <div className="grid gap-4">
        {matches.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No match recommendations have been sent yet.
            </CardContent>
          </Card>
        )}

        {matches.map((match) => (
          <Card key={match.id}>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>{match.customerName}</CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Matched with {match.matchName}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <Badge className={statusColor[match.status]}>
                    {match.status}
                  </Badge>

                  <Select
                    value={match.status}
                    onValueChange={(value) =>
                      handleStatusChange(
                        match.id,
                        value as "Sent" | "Interested" | "Follow Up Needed",
                      )
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Sent">Sent</SelectItem>

                      <SelectItem value="Interested">Interested</SelectItem>

                      <SelectItem value="Follow Up Needed">
                        Follow Up Needed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suggested Match</span>

                  <span className="font-medium">{match.matchName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Compatibility Score
                  </span>

                  <span className="font-semibold">{match.score}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sent Date</span>

                  <span>{match.sentAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
