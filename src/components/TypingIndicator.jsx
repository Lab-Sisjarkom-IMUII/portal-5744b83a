/**
 * TypingIndicator component
 * Menampilkan animated dots untuk menunjukkan AI sedang mengetik
 */
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-[var(--muted)] rounded-2xl rounded-tl-sm max-w-xs">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-[var(--foreground)]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
        <span className="w-2 h-2 bg-[var(--foreground)]/60 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
        <span className="w-2 h-2 bg-[var(--foreground)]/60 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
      </div>
    </div>
  );
}
