import { MatchResult } from "@/types/matches";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import ComparisonModal from "./comparison-modal";
import { getMatchTier } from "@/lib/match-tier";

interface Props {
  match: MatchResult;
  customer: Customer;
}
export default function MatchCard({ match, customer }: Props) {
  const getLabel = () => {
    return getMatchTier(match.score);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={match.profile.personalInfo.photo} />
          </Avatar>

          <div className="flex-1">
            <h3 className="font-semibold">
              {match.profile.personalInfo.firstName}{" "}
              {match.profile.personalInfo.lastName}
            </h3>

            <p className="text-sm text-muted-foreground">
              {match.profile.personalInfo.age} •{" "}
              {match.profile.personalInfo.city}
            </p>

            <p className="text-sm text-muted-foreground">
              {match.profile.professionalInfo.designation}
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold">{match.score}%</div>

            <Badge variant="secondary" className="mt-2">
              {getMatchTier(match.score)}
            </Badge>
          </div>
        </div>

        <div className="mt-4">
          <ComparisonModal customer={customer} match={match} />
        </div>
      </CardContent>
    </Card>
  );
}
