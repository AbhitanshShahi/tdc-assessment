import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  fields: {
    label: string;
    value: string;
  }[];
}

export default function ProfileSection({ title, fields }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex justify-between border-b pb-2"
            >
              <span className="text-muted-foreground">{field.label}</span>

              <span className="font-medium">{field.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
