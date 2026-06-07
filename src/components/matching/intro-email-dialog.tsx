"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Customer } from "@/types/customer";
import { MatchResult } from "@/types/matches";
import { saveSentMatch } from "@/lib/sent-matches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getEmailCacheKey, getCachedData, setCachedData } from "@/lib/ai-cache";

interface Props {
  customer: Customer;
  match: MatchResult;
}
export default function IntroEmailDialog({ customer, match }: Props) {
  const candidate = match.profile;

  const [subject, setSubject] = useState("");

  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const generateEmail = async () => {
      const cacheKey = getEmailCacheKey(customer.id, candidate.id);

      const cached = getCachedData<{
        subject: string;
        body: string;
      }>(cacheKey);

      if (cached) {
        setSubject(cached.subject);

        setBody(cached.body);

        return;
      }

      try {
        setLoading(true);

        const response = await fetch("/api/generate-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer,
            candidate,
          }),
        });

        const data = await response.json();

        setCachedData(cacheKey, data);

        setSubject(data.subject || "");

        setBody(data.body || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    generateEmail();
  }, [open, customer, candidate]);

  const handleSendIntroduction = () => {
    saveSentMatch({
      id: crypto.randomUUID(),

      customerId: customer.id,

      customerName: `${customer.personalInfo.firstName} ${customer.personalInfo.lastName}`,

      matchId: candidate.id,

      matchName: `${candidate.personalInfo.firstName} ${candidate.personalInfo.lastName}`,

      score: match.score,

      sentAt: new Date().toLocaleDateString(),

      status: "Sent",
    });

    toast.success("Introduction email sent successfully");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="w-full">
          Generate Introduction Email
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-[90vw] lg:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Introduction Email</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-10 text-center text-muted-foreground">
            Generating email...
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Match Context */}
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Introduction For
                  </p>

                  <h3 className="font-semibold">
                    {customer.personalInfo.firstName}{" "}
                    {customer.personalInfo.lastName}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Suggested Match
                  </p>

                  <h3 className="font-semibold">
                    {candidate.personalInfo.firstName}{" "}
                    {candidate.personalInfo.lastName}
                  </h3>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="mb-2 block text-sm font-medium">Subject</label>

              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Email Body */}
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">
                Email Body
              </label>

              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[320px] max-h-[500px] resize-none leading-7"
              />
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center justify-between border-t bg-background pt-4 pb-2">
              <div className="text-sm text-muted-foreground">
                This recommendation will be recorded in Sent Matches.
              </div>

              <Button size="lg" onClick={handleSendIntroduction}>
                Send Introduction
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
