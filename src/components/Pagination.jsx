import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination component
 * @param {Object} props
 * @param {number} props.currentPage - Current page (1-based)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback with next page
 * @param {number} [props.maxVisiblePages=5] - Max visible page buttons
 * @param {string} [props.className=""] - Additional wrapper classes
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className = "",
}) {
  if (!totalPages || totalPages <= 1) return null;

  const clampedPage = Math.min(Math.max(currentPage, 1), totalPages);
  const half = Math.floor(maxVisiblePages / 2);
  const startPage = Math.max(1, Math.min(clampedPage - half, totalPages - maxVisiblePages + 1));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pages = [];
  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  const showFirst = pages[0] > 1;
  const showLast = pages[pages.length - 1] < totalPages;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}>
      <span className="text-xs sm:text-sm text-[var(--foreground)]/60">
        Halaman {clampedPage} dari {totalPages}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(clampedPage - 1)}
          disabled={clampedPage === 1}
          className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs sm:text-sm text-[var(--foreground)]/70 hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {showFirst && (
          <>
            <button
              type="button"
              onClick={() => goToPage(1)}
              className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
                clampedPage === 1
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] text-[var(--foreground)]/70 hover:bg-[var(--muted)]"
              }`}
            >
              1
            </button>
            {pages[0] > 2 && <span className="px-1 text-[var(--foreground)]/40">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
              page === clampedPage
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "border border-[var(--border)] text-[var(--foreground)]/70 hover:bg-[var(--muted)]"
            }`}
          >
            {page}
          </button>
        ))}

        {showLast && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-[var(--foreground)]/40">...</span>
            )}
            <button
              type="button"
              onClick={() => goToPage(totalPages)}
              className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
                clampedPage === totalPages
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border border-[var(--border)] text-[var(--foreground)]/70 hover:bg-[var(--muted)]"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => goToPage(clampedPage + 1)}
          disabled={clampedPage === totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs sm:text-sm text-[var(--foreground)]/70 hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
