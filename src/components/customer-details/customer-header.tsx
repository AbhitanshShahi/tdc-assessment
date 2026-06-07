import { Customer } from "@/types/customer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

interface Props {
  customer: Customer;
}

export default function CustomerHeader({ customer }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-background p-6 md:flex-row md:items-center">
      <Avatar className="h-20 w-20">
        <AvatarImage src={customer.personalInfo.photo} />
      </Avatar>

      <div className="flex-1">
        <h1 className="text-3xl font-bold">
          {customer.personalInfo.firstName} {customer.personalInfo.lastName}
        </h1>

        <p className="text-muted-foreground">
          {customer.professionalInfo.designation} @{" "}
          {customer.professionalInfo.company}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {customer.personalInfo.city}, {customer.personalInfo.country}
        </p>
      </div>

      <Badge className="w-fit">{customer.matchmaking.currentStage}</Badge>
    </div>
  );
}
