export function getAnalysisCacheKey(customerId: string, matchId: string) {
  return `analysis-${customerId}-${matchId}`;
}

export function getEmailCacheKey(customerId: string, matchId: string) {
  return `email-${customerId}-${matchId}`;
}

export function getCachedData<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(key);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setCachedData(key: string, data: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, JSON.stringify(data));
}
