import { MatchResult } from "@/types/matches";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  match: MatchResult;
}

const maxScores = {
  age: 15,
  religion: 15,
  location: 10,
  education: 8,
  language: 12,
  familyType: 7,
  diet: 5,
  kids: 15,
  relocation: 3,
  lifestyle: 10,
};

export default function CompatibilityBreakdown({ match }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compatibility Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {Object.entries(match.breakdown).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b pb-2">
              <span className="capitalize">{key}</span>

              <span className="font-medium">
                {value}/{maxScores[key as keyof typeof maxScores]}
              </span>
            </div>
          ))}

          <div className="flex justify-between pt-2 text-lg font-bold">
            <span>Total Score</span>

            <span>{match.score}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
