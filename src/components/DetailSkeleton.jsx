/**
 * DetailSkeleton component untuk detail page loading state
 */
export function DetailSkeleton() {
  return (
    <div className="py-8 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-8 w-24 bg-[var(--muted)] rounded-lg mb-6" />
      
      {/* Hero section skeleton */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-6 w-20 bg-[var(--muted)] rounded-full" />
              <div className="h-6 w-16 bg-[var(--muted)] rounded-full" />
            </div>
            <div className="h-10 w-3/4 bg-[var(--muted)] rounded mb-4" />
          </div>
          <div className="h-8 w-20 bg-[var(--muted)] rounded-lg" />
        </div>
        <div className="w-full h-64 md:h-96 bg-[var(--muted)] rounded-lg" />
      </div>
      
      {/* Description skeleton */}
      <div className="mb-8">
        <div className="h-7 w-32 bg-[var(--muted)] rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-[var(--muted)] rounded" />
          <div className="h-4 w-full bg-[var(--muted)] rounded" />
          <div className="h-4 w-5/6 bg-[var(--muted)] rounded" />
        </div>
      </div>
      
      {/* Info section skeleton */}
      <div className="mb-8">
        <div className="h-7 w-32 bg-[var(--muted)] rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-20 bg-[var(--muted)] rounded-lg" />
          <div className="h-20 bg-[var(--muted)] rounded-lg" />
        </div>
      </div>
      
      {/* Links section skeleton */}
      <div className="mb-8">
        <div className="h-7 w-24 bg-[var(--muted)] rounded mb-4" />
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-[var(--muted)] rounded-lg" />
          <div className="h-10 w-36 bg-[var(--muted)] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

