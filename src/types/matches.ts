import { Customer } from "./customer";

export interface MatchBreakdown {
  age: number;
  religion: number;
  location: number;
  education: number;
  language: number;
  familyType: number;
  diet: number;
  kids: number;
  relocation: number;
  lifestyle: number;
}

export interface MatchResult {
  profile: Customer;
  score: number;
  breakdown: MatchBreakdown;
}
