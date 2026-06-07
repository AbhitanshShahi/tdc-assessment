"use client";

import { useMemo, useState } from "react";
import { customers } from "@/data/customers";
import { Customer } from "@/types/customer";
import { getTopMatches } from "@/lib/matching";
import MatchCard from "./match-card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  customer: Customer;
}

export default function MatchResultsDialog({ customer }: Props) {
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    return getTopMatches(customer, customers);
  }, [customer]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Find Matches</Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-[85vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-hidden p-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold">Top Matches</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {matches.length} compatible profiles found.
          </p>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-4 py-2">
            {matches.map((match) => (
              <MatchCard
                key={match.profile.id}
                match={match}
                customer={customer}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
