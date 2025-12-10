/**
 * CardSkeleton component untuk loading state
 */
export function CardSkeleton() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-[var(--muted)]" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-5 bg-[var(--muted)] rounded w-3/4" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-[var(--muted)] rounded w-full" />
          <div className="h-4 bg-[var(--muted)] rounded w-5/6" />
        </div>
        
        {/* Owner skeleton */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-8 w-8 bg-[var(--muted)] rounded-full" />
          <div className="h-4 bg-[var(--muted)] rounded w-24" />
        </div>
        
        {/* Badges skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-[var(--muted)] rounded-full w-16" />
          <div className="h-6 bg-[var(--muted)] rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}

