export interface SentMatch {
  id: string;

  customerId: string;
  customerName: string;

  matchId: string;
  matchName: string;

  score: number;

  sentAt: string;

  status: "Sent" | "Interested" | "Follow Up Needed";
}
