export type JourneyStage =
  | "Onboarded"
  | "Verified"
  | "Matching"
  | "Introduced"
  | "Meeting Scheduled"
  | "Success";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  age: number;
  photo: string;
  city: string;
  country: string;
  height: string;
}

export interface ProfessionalInfo {
  education: string;
  degree: string;
  company: string;
  designation: string;
  income: number;
}

export interface FamilyInfo {
  religion: string;
  caste: string;
  familyType: "Nuclear" | "Joint";
  siblings: number;
  languages: string[];
}

export interface Preferences {
  diet: "Vegetarian" | "Non-Vegetarian" | "Eggetarian";
  lifestyle: "Traditional" | "Moderate" | "Modern";
  wantKids: "Yes" | "No" | "Maybe";
  openToRelocate: boolean;
}

export interface MatchmakingInfo {
  currentStage: JourneyStage;
}

export interface Customer {
  id: string;

  personalInfo: PersonalInfo;

  professionalInfo: ProfessionalInfo;

  familyInfo: FamilyInfo;

  preferences: Preferences;

  matchmaking: MatchmakingInfo;

  maritalStatus: "Never Married" | "Divorced";
}
