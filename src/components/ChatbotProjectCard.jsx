import { useNavigate } from "react-router-dom";
import { ExternalLink, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { generateSlug } from "../utils/slug";

/**
 * ChatbotProjectCard component
 * Compact project card untuk display di chat context
 * @param {Object} project - Project data dari chatbot response
 * @param {number} index - Index untuk stagger animation
 */
export function ChatbotProjectCard({ project, index = 0 }) {
  const navigate = useNavigate();
  
  const title = project.title || project.name || "Untitled";
  const description = project.description || "";
  const tags = project.tags || [];
  const projectId = project.id;
  const repoUrl = project.repo_url;
  
  const handleClick = () => {
    if (projectId) {
      // Use slug if available, fallback to ID
      const slug = generateSlug(title);
      // Prefer slug for better SEO and readability, but keep ID as fallback
      const identifier = slug || projectId;
      navigate(`/project/${identifier}`);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 cursor-pointer hover:border-[var(--primary)]/50 transition-all duration-200"
      onClick={handleClick}
    >
      {/* Title */}
      <h4 className="text-base font-semibold text-[var(--foreground)] mb-2 line-clamp-2">
        {title}
      </h4>
      
      {/* Description */}
      {description && (
        <p className="text-sm text-[var(--foreground)]/70 mb-3 line-clamp-2">
          {description}
        </p>
      )}
      
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-[var(--primary)]/20 text-[var(--primary)] rounded-full"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-[var(--foreground)]/50 px-2 py-0.5">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      )}
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <span className="text-xs text-[var(--foreground)]/60">
          Klik untuk melihat detail
        </span>
        {repoUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(repoUrl, "_blank", "noopener,noreferrer");
            }}
            className="p-1 hover:bg-[var(--muted)] rounded transition-colors"
            title="View repository"
          >
            <ExternalLink className="h-4 w-4 text-[var(--accent)]" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
