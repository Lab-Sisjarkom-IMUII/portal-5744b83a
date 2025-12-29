import { useMemo } from "react";
import { FolderKanban, Briefcase, Eye, EyeOff } from "lucide-react";
import { Card } from "./Card";

/**
 * StatsOverview Component
 * Calculate and display user stats from projects and portfolios
 * @param {Array} projects - Array of projects
 * @param {Array} portfolios - Array of portfolios
 */
export function StatsOverview({ projects = [], portfolios = [] }) {
  const stats = useMemo(() => {
    const projectsCount = projects.length;
    const portfoliosCount = portfolios.length;
    
    // Count showcased items
    const showcasedProjects = projects.filter(p => p.is_showcased !== false).length;
    const showcasedPortfolios = portfolios.filter(p => p.is_showcased !== false).length;
    const totalShowcased = showcasedProjects + showcasedPortfolios;
    
    // Count hidden items
    const hiddenProjects = projects.filter(p => p.is_showcased === false).length;
    const hiddenPortfolios = portfolios.filter(p => p.is_showcased === false).length;
    const totalHidden = hiddenProjects + hiddenPortfolios;
    
    return {
      projectsCount,
      portfoliosCount,
      totalShowcased,
      totalHidden,
    };
  }, [projects, portfolios]);

  const statCards = [
    {
      label: "Total Projects",
      value: stats.projectsCount,
      icon: FolderKanban,
      color: "blue",
    },
    {
      label: "Total Portfolios",
      value: stats.portfoliosCount,
      icon: Briefcase,
      color: "purple",
    },
    {
      label: "Showcased",
      value: stats.totalShowcased,
      icon: Eye,
      color: "green",
    },
    {
      label: "Hidden",
      value: stats.totalHidden,
      icon: EyeOff,
      color: "gray",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-400",
    purple: "bg-purple-500/20 text-purple-400",
    green: "bg-green-500/20 text-green-400",
    gray: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${colorClasses[stat.color]}`}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

