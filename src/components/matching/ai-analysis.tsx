"use client";

import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import { MatchResult } from "@/types/matches";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAnalysisCacheKey,
  getCachedData,
  setCachedData,
} from "@/lib/ai-cache";

interface Props {
  customer: Customer;
  match: MatchResult;
}

interface AnalysisResponse {
  whyItWorks: string[];
  concerns: string[];
  strengths: string[];
}

export default function AIAnalysis({ customer, match }: Props) {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const cacheKey = getAnalysisCacheKey(customer.id, match.profile.id);

      const cached = getCachedData<AnalysisResponse>(cacheKey);

      if (cached) {
        setAnalysis(cached);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/match-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer,
            candidate: match.profile,
            score: match.score,
          }),
        });

        const data = await response.json();

        setCachedData(cacheKey, data);

        setAnalysis(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [customer, match]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Match Analysis</CardTitle>
        </CardHeader>

        <CardContent>Generating analysis...</CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Match Analysis</CardTitle>
        </CardHeader>

        <CardContent>Failed to generate analysis.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Match Analysis</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h4 className="mb-2 font-semibold">Why This Match Works</h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {analysis.whyItWorks.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Potential Concerns</h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {analysis.concerns.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Relationship Strengths</h4>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {analysis.strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
