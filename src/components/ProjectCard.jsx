import { useNavigate } from "react-router-dom";
import { ExternalLink, Youtube, Calendar } from "lucide-react";
import { Card } from "./Card";
import { generateSlug } from "../utils/slug";

/**
 * ProjectCard component untuk display project/portfolio di showcase
 * @param {Object} item - Project atau Portfolio dengan type field
 */
export function ProjectCard({ item }) {
  const navigate = useNavigate();
  
  const title = item.showcase_title || item.name || "Untitled";
  const description = item.showcase_description || item.description || "";
  const thumbnailUrl = item.thumbnail_url;
  const owner = item.owner || item.user;
  const deployUrl = item.deploy_url;
  const youtubeLink = item.youtube_link;
  const tags = item.tags || [];
  const createdDate = item.created_at || item.updated_at;
  
  const handleClick = () => {
    // Generate slug from title/name for better URLs
    const title = item.showcase_title || item.name || "";
    const slug = generateSlug(title);
    const identifier = slug || item.id;
    
    const path = item.type === "project" 
      ? `/project/${identifier}` 
      : `/portfolio/${identifier}`;
    navigate(path);
  };
  
  const handleDeployClick = (e) => {
    e.stopPropagation();
    if (deployUrl) {
      window.open(deployUrl, "_blank", "noopener,noreferrer");
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="w-full h-48 bg-[var(--muted)] overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 ${
            thumbnailUrl ? "hidden" : ""
          }`}
        >
          <div className="text-4xl font-bold text-[var(--primary)]/50">
            {title.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Type Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-[var(--foreground)] line-clamp-2 flex-1">
            {title}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
              item.type === "project"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-purple-500/20 text-purple-400"
            }`}
          >
            {item.type === "project" ? "Project" : "Portfolio"}
          </span>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-sm text-[var(--foreground)]/70 line-clamp-3">
            {description}
          </p>
        )}
        
        {/* Owner Info */}
        {owner && (
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
            {owner.avatar_url ? (
              <img
                src={owner.avatar_url}
                alt={owner.name}
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-xs font-medium text-[var(--primary)]">
                {owner.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <span className="text-xs text-[var(--foreground)]/60 truncate">
              {owner.name || owner.email || "Unknown"}
            </span>
          </div>
        )}
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-[var(--muted)] text-[var(--foreground)]/70 rounded"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-[var(--foreground)]/50">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Footer: Links and Date */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            {youtubeLink && (
              <Youtube className="h-4 w-4 text-red-500" title="Has YouTube video" />
            )}
            {deployUrl && (
              <button
                onClick={handleDeployClick}
                className="p-1 hover:bg-[var(--muted)] rounded transition-colors"
                title="Open deployment"
              >
                <ExternalLink className="h-4 w-4 text-[var(--accent)]" />
              </button>
            )}
          </div>
          
          {createdDate && (
            <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/50">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(createdDate)}</span>
            </div>
          )}
        </div>
        
        {/* Status Badge */}
        <div className="pt-2">
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
            Deployed
          </span>
        </div>
      </div>
    </Card>
  );
}

