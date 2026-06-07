import { Customer } from "@/types/customer";
import { MatchBreakdown, MatchResult } from "@/types/matches";

const WEIGHTS = {
  age: 15,
  religion: 15,
  location: 10,
  education: 8,
  language: 12,
  familyType: 7,
  diet: 5,
  kids: 15,
  relocation: 3,
  lifestyle: 10,
};

export function calculateCompatibility(
  customer: Customer,
  candidate: Customer,
): MatchResult {
  const breakdown: MatchBreakdown = {
    age: 0,
    religion: 0,
    location: 0,
    education: 0,
    language: 0,
    familyType: 0,
    diet: 0,
    kids: 0,
    relocation: 0,
    lifestyle: 0,
  };

  const ageDiff = Math.abs(
    customer.personalInfo.age - candidate.personalInfo.age,
  );

  if (ageDiff <= 2) {
    breakdown.age = 15;
  } else if (ageDiff <= 5) {
    breakdown.age = 12;
  } else if (ageDiff <= 8) {
    breakdown.age = 8;
  } else {
    breakdown.age = 3;
  }

  if (customer.familyInfo.religion === candidate.familyInfo.religion) {
    breakdown.religion = WEIGHTS.religion;
  }

  if (customer.personalInfo.city === candidate.personalInfo.city) {
    breakdown.location = 10;
  } else if (
    customer.preferences.openToRelocate ||
    candidate.preferences.openToRelocate
  ) {
    breakdown.location = 7;
  } else {
    breakdown.location = 3;
  }

  if (
    customer.professionalInfo.education === candidate.professionalInfo.education
  ) {
    breakdown.education = 8;
  } else {
    breakdown.education = 5;
  }

  const sharedLanguages = customer.familyInfo.languages.filter((language) =>
    candidate.familyInfo.languages.includes(language),
  );

  if (sharedLanguages.length >= 2) {
    breakdown.language = 12;
  } else if (sharedLanguages.length === 1) {
    breakdown.language = 7;
  }

  if (customer.familyInfo.familyType === candidate.familyInfo.familyType) {
    breakdown.familyType = WEIGHTS.familyType;
  }

  if (customer.familyInfo.familyType === candidate.familyInfo.familyType) {
    breakdown.familyType = 7;
  } else {
    breakdown.familyType = 3;
  }

  if (customer.preferences.diet === candidate.preferences.diet) {
    breakdown.diet = 5;
  } else {
    breakdown.diet = 2;
  }

  if (customer.preferences.wantKids === candidate.preferences.wantKids) {
    breakdown.kids = WEIGHTS.kids;
  } else if (
    customer.preferences.wantKids === "Maybe" ||
    candidate.preferences.wantKids === "Maybe"
  ) {
    breakdown.kids = 8;
  }

  if (
    customer.preferences.openToRelocate === candidate.preferences.openToRelocate
  ) {
    breakdown.relocation = 3;
  } else {
    breakdown.relocation = 1;
  }

  if (customer.preferences.lifestyle === candidate.preferences.lifestyle) {
    breakdown.lifestyle = 10;
  } else {
    breakdown.lifestyle = 4;
  }

  const score = Object.values(breakdown).reduce(
    (total, value) => total + value,
    0,
  );

  return {
    profile: candidate,
    score,
    breakdown,
  };
}

export function getTopMatches(
  customer: Customer,
  customers: Customer[],
): MatchResult[] {
  return customers
    .filter((candidate) => candidate.id !== customer.id)
    .filter(
      (candidate) =>
        candidate.personalInfo.gender !== customer.personalInfo.gender,
    )
    .map((candidate) => calculateCompatibility(customer, candidate))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}
