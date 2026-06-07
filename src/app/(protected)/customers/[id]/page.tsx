import { notFound } from "next/navigation";
import { customers } from "@/data/customers";
import { getTopMatches } from "@/lib/matching";
import CustomerHeader from "@/components/customer-details/customer-header";
import ProfileSection from "@/components/customer-details/profile-section";
import JourneyTimeline from "@/components/customer-details/journey-timeline";
import NotesSection from "@/components/customer-details/notes-section";
import MatchResultsDialog from "@/components/matching/match-results-dialog";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params;

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CustomerHeader customer={customer} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ProfileSection
            title="Personal Information"
            fields={[
              {
                label: "Gender",
                value: customer.personalInfo.gender,
              },
              {
                label: "Age",
                value: String(customer.personalInfo.age),
              },
              {
                label: "Date Of Birth",
                value: customer.personalInfo.dateOfBirth,
              },
              {
                label: "Height",
                value: customer.personalInfo.height,
              },
              {
                label: "Location",
                value: `${customer.personalInfo.city}, ${customer.personalInfo.country}`,
              },
            ]}
          />

          <ProfileSection
            title="Professional Information"
            fields={[
              {
                label: "Education",
                value: customer.professionalInfo.education,
              },
              {
                label: "Degree",
                value: customer.professionalInfo.degree,
              },
              {
                label: "Company",
                value: customer.professionalInfo.company,
              },
              {
                label: "Designation",
                value: customer.professionalInfo.designation,
              },
              {
                label: "Income",
                value: `₹${customer.professionalInfo.income.toLocaleString()}`,
              },
            ]}
          />

          <ProfileSection
            title="Family Information"
            fields={[
              {
                label: "Religion",
                value: customer.familyInfo.religion,
              },
              {
                label: "Caste",
                value: customer.familyInfo.caste,
              },
              {
                label: "Family Type",
                value: customer.familyInfo.familyType,
              },
              {
                label: "Languages",
                value: customer.familyInfo.languages.join(", "),
              },
              {
                label: "Siblings",
                value: String(customer.familyInfo.siblings),
              },
            ]}
          />

          <ProfileSection
            title="Preferences"
            fields={[
              {
                label: "Diet",
                value: customer.preferences.diet,
              },
              {
                label: "Lifestyle",
                value: customer.preferences.lifestyle,
              },
              {
                label: "Want Kids",
                value: customer.preferences.wantKids,
              },
              {
                label: "Open To Relocate",
                value: customer.preferences.openToRelocate ? "Yes" : "No",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <JourneyTimeline customer={customer} />

          <NotesSection customerId={customer.id} />
        </div>
      </div>

      <MatchResultsDialog customer={customer} />
    </div>
  );
}
