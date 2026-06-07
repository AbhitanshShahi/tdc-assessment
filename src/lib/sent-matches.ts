import { SentMatch } from "@/types/sent-match";

const STORAGE_KEY = "tdc-sent-matches";

export function getSentMatches(): SentMatch[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  return stored ? JSON.parse(stored) : [];
}

export function saveSentMatch(match: SentMatch) {
  const matches = getSentMatches();

  matches.unshift(match);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
}
export function updateMatchStatus(
  id: string,
  status: "Sent" | "Interested" | "Follow Up Needed",
) {
  const matches = getSentMatches();

  const updated = matches.map((match) =>
    match.id === id
      ? {
          ...match,
          status,
        }
      : match,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
}
export function getDashboardStats() {
  const matches = getSentMatches();

  return {
    matchesSent: matches.length,

    interested: matches.filter((match) => match.status === "Interested").length,

    followUps: matches.filter((match) => match.status === "Follow Up Needed")
      .length,
  };
}
