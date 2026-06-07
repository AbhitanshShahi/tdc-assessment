import { Customer } from "@/types/customer";

const stages = [
  "Onboarded",
  "Verified",
  "Matching",
  "Introduced",
  "Meeting Scheduled",
  "Success",
];

interface Props {
  customer: Customer;
}

export default function JourneyTimeline({ customer }: Props) {
  const currentIndex = stages.indexOf(customer.matchmaking.currentStage);

  return (
    <div className="rounded-xl border bg-background p-6">
      <h3 className="mb-6 text-lg font-semibold">Matchmaking Journey</h3>

      <div className="space-y-5">
        {stages.map((stage, index) => {
          const active = index <= currentIndex;

          return (
            <div key={stage} className="flex items-center gap-4">
              <div
                className={`h-3 w-3 rounded-full ${
                  active ? "bg-primary" : "bg-muted"
                }`}
              />

              <span
                className={active ? "font-medium" : "text-muted-foreground"}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
