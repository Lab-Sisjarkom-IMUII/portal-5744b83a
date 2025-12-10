import { useState, useMemo } from "react";
import { useShowcase } from "../hooks/useShowcase";
import { Spinner } from "../components/Spinner";
import { Button } from "../components/Button";
import { CardSkeleton } from "../components/CardSkeleton";
import { ProjectCard } from "../components/ProjectCard";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import { HeroSection } from "../components/HeroSection";

/**
 * Showcase Page
 * Menampilkan semua project dan portfolio yang telah di-deploy
 */
export function ShowcasePage() {
  const { items, loading, error, refetch } = useShowcase();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Get unique owners untuk filter
  const uniqueOwners = useMemo(() => {
    const owners = new Map();
    items.forEach((item) => {
      const owner = item.owner || item.user;
      if (owner && !owners.has(owner.id)) {
        owners.set(owner.id, owner);
      }
    });
    return Array.from(owners.values());
  }, [items]);

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        const title = (item.showcase_title || item.name || "").toLowerCase();
        const description = (item.showcase_description || item.description || "").toLowerCase();
        const owner = item.owner || item.user;
        const ownerName = (owner?.name || "").toLowerCase();
        
        return (
          title.includes(query) ||
          description.includes(query) ||
          ownerName.includes(query)
        );
      });
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((item) => item.type === typeFilter);
    }

    // Apply owner filter
    if (ownerFilter !== "all") {
      filtered = filtered.filter((item) => {
        const owner = item.owner || item.user;
        return owner?.id === ownerFilter;
      });
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          const dateA = new Date(a.created_at || a.updated_at || 0);
          const dateB = new Date(b.created_at || b.updated_at || 0);
          return dateB - dateA;
        
        case "oldest":
          const dateAOld = new Date(a.created_at || a.updated_at || 0);
          const dateBOld = new Date(b.created_at || b.updated_at || 0);
          return dateAOld - dateBOld;
        
        case "alphabetical-az":
          const nameA = (a.showcase_title || a.name || "").toLowerCase();
          const nameB = (b.showcase_title || b.name || "").toLowerCase();
          return nameA.localeCompare(nameB);
        
        case "alphabetical-za":
          const nameAZ = (a.showcase_title || a.name || "").toLowerCase();
          const nameBZ = (b.showcase_title || b.name || "").toLowerCase();
          return nameBZ.localeCompare(nameAZ);
        
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchQuery, typeFilter, ownerFilter, sortBy]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "type":
        setTypeFilter(value);
        break;
      case "owner":
        setOwnerFilter(value);
        break;
      case "sort":
        setSortBy(value);
        break;
      default:
        break;
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setOwnerFilter("all");
    setSortBy("newest");
  };

  // Check if any filter is active
  const hasActiveFilters = searchQuery.trim() || typeFilter !== "all" || ownerFilter !== "all" || sortBy !== "newest";

  // Loading state
  if (loading) {
    return (
      <div>
        <HeroSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <HeroSection />
        <div className="py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={refetch} variant="primary">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div>
        <HeroSection />
        <div className="py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <p className="text-[var(--foreground)]/60 text-lg mb-4">
              No projects or portfolios found.
            </p>
            <p className="text-[var(--foreground)]/40">
              Deployed items will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero/Introduction Section */}
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search projects and portfolios..."
          />
          
          <FilterBar
            filters={{
              type: typeFilter,
              owner: ownerFilter,
              sort: sortBy,
            }}
            owners={uniqueOwners}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          
          {/* Results count */}
          <div className="text-sm text-[var(--foreground)]/60">
            {filteredItems.length === items.length ? (
              <span>Showing all {items.length} items</span>
            ) : (
              <span>
                Showing {filteredItems.length} of {items.length} items
              </span>
            )}
          </div>
        </div>

        {/* Empty filtered results */}
        {filteredItems.length === 0 && hasActiveFilters ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <p className="text-[var(--foreground)]/60 text-lg mb-4">
              No items match your filters.
            </p>
            <Button onClick={clearFilters} variant="secondary">
              Clear Filters
            </Button>
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ProjectCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
