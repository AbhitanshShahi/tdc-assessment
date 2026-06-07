"use client";

import { Customer } from "@/types/customer";
import { MatchResult } from "@/types/matches";
import CompatibilityBreakdown from "./compatibility-breakdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AIAnalysis from "./ai-analysis";
import IntroEmailDialog from "./intro-email-dialog";

interface Props {
  customer: Customer;
  match: MatchResult;
}

export default function ComparisonModal({ customer, match }: Props) {
  const candidate = match.profile;

  const rows = [
    {
      label: "Age",
      customer: customer.personalInfo.age,
      candidate: candidate.personalInfo.age,
    },
    {
      label: "Location",
      customer: customer.personalInfo.city,
      candidate: candidate.personalInfo.city,
    },
    {
      label: "Education",
      customer: customer.professionalInfo.education,
      candidate: candidate.professionalInfo.education,
    },
    {
      label: "Profession",
      customer: customer.professionalInfo.designation,
      candidate: candidate.professionalInfo.designation,
    },
    {
      label: "Income",
      customer: `₹${customer.professionalInfo.income.toLocaleString()}`,
      candidate: `₹${candidate.professionalInfo.income.toLocaleString()}`,
    },
    {
      label: "Religion",
      customer: customer.familyInfo.religion,
      candidate: candidate.familyInfo.religion,
    },
    {
      label: "Languages",
      customer: customer.familyInfo.languages.join(", "),
      candidate: candidate.familyInfo.languages.join(", "),
    },
    {
      label: "Family Type",
      customer: customer.familyInfo.familyType,
      candidate: candidate.familyInfo.familyType,
    },
    {
      label: "Diet",
      customer: customer.preferences.diet,
      candidate: candidate.preferences.diet,
    },
    {
      label: "Want Kids",
      customer: customer.preferences.wantKids,
      candidate: candidate.preferences.wantKids,
    },
    {
      label: "Relocation",
      customer: customer.preferences.openToRelocate ? "Yes" : "No",
      candidate: candidate.preferences.openToRelocate ? "Yes" : "No",
    },
    {
      label: "Lifestyle",
      customer: customer.preferences.lifestyle,
      candidate: candidate.preferences.lifestyle,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Compare</Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-[90vw] lg:max-w-6xl xl:max-w-7xl max-h-[92vh] overflow-y-auto p-4 md:p-6 lg:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">
            Profile Comparison
          </DialogTitle>
        </DialogHeader>

        {/* Outer grid breakdown */}
        <div className="grid gap-8 lg:grid-cols-[2.5fr_1fr]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header Profiling Section */}
            <div className="grid gap-6 border-b pb-6 sm:grid-cols-2">
              {/* Customer */}
              <div className="flex items-center gap-4">
                <img
                  src={customer.personalInfo.photo}
                  alt={customer.personalInfo.firstName}
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-primary/10"
                />

                <div>
                  <h3 className="text-lg md:text-xl font-bold leading-tight">
                    {customer.personalInfo.firstName}{" "}
                    {customer.personalInfo.lastName}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-0.5">
                    {customer.professionalInfo.designation}
                  </p>

                  <p className="text-xs md:text-sm text-muted-foreground">
                    {customer.personalInfo.city}, India
                  </p>
                </div>
              </div>

              {/* Candidate */}
              <div className="flex items-center justify-start sm:justify-end gap-4 sm:text-right">
                <div className="order-2 sm:order-1">
                  <h3 className="text-lg md:text-xl font-bold leading-tight">
                    {candidate.personalInfo.firstName}{" "}
                    {candidate.personalInfo.lastName}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-0.5">
                    {candidate.professionalInfo.designation}
                  </p>

                  <p className="text-xs md:text-sm text-muted-foreground">
                    {candidate.personalInfo.city}, India
                  </p>
                </div>

                <img
                  src={candidate.personalInfo.photo}
                  alt={candidate.personalInfo.firstName}
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-primary/10 order-1 sm:order-2"
                />
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-hidden rounded-xl border bg-card">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 items-center border-b px-4 py-3.5 md:px-6 md:py-4 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="font-medium text-sm md:text-base break-words pr-2">
                    {row.customer}
                  </div>

                  <div className="text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground bg-muted/60 py-1 px-1.5 rounded-md mx-auto w-full max-w-[120px] break-words">
                    {row.label}
                  </div>

                  <div className="text-right font-medium text-sm md:text-base break-words pl-2">
                    {row.candidate}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Analysis - Full Width */}
            <AIAnalysis customer={customer} match={match} />

            {/* Email Generation */}
            <IntroEmailDialog customer={customer} match={match} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:border-l lg:pl-6">
            <div className="sticky top-6">
              <CompatibilityBreakdown match={match} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
