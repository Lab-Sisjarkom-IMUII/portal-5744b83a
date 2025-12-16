import { useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProjects } from "../hooks/useProjects";
import { usePortfolios } from "../hooks/usePortfolios";
import { StatsOverview } from "../components/StatsOverview";
import { MyProjects } from "../components/MyProjects";
import { MyPortfolios } from "../components/MyPortfolios";
import { MyEvents } from "../components/MyEvents";
import { Loader2 } from "lucide-react";

/**
 * DashboardPage
 * Main dashboard page untuk user mengelola projects dan portfolios
 */
export function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { projects, loading: projectsLoading, refetch: refetchProjects } = useProjects();
  const { portfolios, loading: portfoliosLoading, refetch: refetchPortfolios } = usePortfolios();

  const [refetchKey, setRefetchKey] = useState(0);

  // Combined refetch function
  const handleRefetch = useCallback(() => {
    refetchProjects();
    refetchPortfolios();
    setRefetchKey(prev => prev + 1);
  }, [refetchProjects, refetchPortfolios]);

  // Loading state
  const loading = authLoading || projectsLoading || portfoliosLoading;

  if (loading && !projects.length && !portfolios.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          My Dashboard
        </h1>
        <p className="text-[var(--foreground)]/60">
          Welcome back, {user?.name || user?.email || "User"}! Manage your projects and portfolios here.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview projects={projects} portfolios={portfolios} />

      {/* My Projects Section */}
      <div className="mb-12">
        <MyProjects onRefetch={handleRefetch} key={`projects-${refetchKey}`} />
      </div>
      
      {/* My Portfolios Section */}
      <div className="mb-12">
        <MyPortfolios onRefetch={handleRefetch} key={`portfolios-${refetchKey}`} />
      </div>

      {/* My Events Section */}
      <div className="mb-12">
        <MyEvents />
      </div>
    </div>
  );
}

