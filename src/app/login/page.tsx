import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden border-r lg:flex lg:flex-col lg:justify-center lg:px-16">
          <div className="max-w-lg">
            <p className="text-sm font-medium text-muted-foreground">
              The Date Crew
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight">
              Matchmaker Dashboard
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Professional CRM and decision-support platform for modern
              matchmakers.
            </p>

            <div className="mt-10 space-y-4">
              <div>Manage customer journeys</div>
              <div>Review compatibility insights</div>
              <div>Generate AI-assisted recommendations</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
