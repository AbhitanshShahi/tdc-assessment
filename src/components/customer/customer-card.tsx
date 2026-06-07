import Link from "next/link";

import { Customer } from "@/types/customer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  customer: Customer;
}

export default function CustomerCard({ customer }: Props) {
  return (
    <Link href={`/customers/${customer.id}`}>
      <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={customer.personalInfo.photo} />
            </Avatar>

            <div>
              <h3 className="font-semibold">
                {customer.personalInfo.firstName}{" "}
                {customer.personalInfo.lastName}
              </h3>

              <p className="text-sm text-muted-foreground">
                {customer.personalInfo.age} • {customer.personalInfo.city}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{customer.maritalStatus}</Badge>

            <Badge>{customer.matchmaking.currentStage}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
