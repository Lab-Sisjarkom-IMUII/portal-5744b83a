import { X } from "lucide-react";
import { Button } from "./Button";

/**
 * FilterBar component untuk filter dan sort
 * @param {Object} filters - Current filter values { type, owner, sort }
 * @param {Array} owners - List of unique owners
 * @param {Function} onFilterChange - Filter change handler (filterType, value)
 * @param {Function} onClearFilters - Clear all filters handler
 * @param {boolean} hasActiveFilters - Whether any filter is active
 */
export function FilterBar({
  filters,
  owners = [],
  onFilterChange,
  onClearFilters,
  hasActiveFilters = false,
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
      {/* Type Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-[var(--foreground)]/70">
          Type:
        </label>
        <div className="flex gap-2">
          {["all", "project", "portfolio"].map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange("type", type)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filters.type === type
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--muted)] text-[var(--foreground)]/70 hover:bg-[var(--muted)]/80"
              }`}
            >
              {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Owner Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-[var(--foreground)]/70">
          Owner:
        </label>
        <select
          value={filters.owner}
          onChange={(e) => onFilterChange("owner", e.target.value)}
          className="px-3 py-1 text-sm bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
        >
          <option value="all">All Owners</option>
          {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name || owner.email || "Unknown"}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-[var(--foreground)]/70">
          Sort:
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className="px-3 py-1 text-sm bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical-az">A-Z</option>
          <option value="alphabetical-za">Z-A</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onClearFilters}
          className="ml-auto"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}

