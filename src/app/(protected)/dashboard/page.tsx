import StatsCards from "@/components/dashboard/stats-cards";
import RecentActivity from "@/components/dashboard/recent-activity";
import QuickActions from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Intro */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>

        <p className="text-muted-foreground">
          Here's an overview of your matchmaking activity.
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Lower Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentActivity />
        </div>

        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
