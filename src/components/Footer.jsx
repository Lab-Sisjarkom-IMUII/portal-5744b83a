import { ExternalLink } from "lucide-react";

/**
 * Footer component dengan links dan copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://imuii.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
            >
              IMUII Web
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
            >
              GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-[var(--foreground)]/60">
            © {currentYear} IMUII Portal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

