import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Edit, ExternalLink, Youtube, Calendar, User, Eye, EyeOff } from "lucide-react";
import { useProject } from "../hooks/useProject";
import { usePortfolio } from "../hooks/usePortfolio";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/Spinner";
import { Button } from "../components/Button";
import { DetailSkeleton } from "../components/DetailSkeleton";
import { ShareButtons } from "../components/ShareButtons";
import { TeamMemberCard } from "../components/TeamMemberCard";
import { EditModal } from "../components/EditModal";
import { useState } from "react";

/**
 * Detail Page untuk project atau portfolio
 */
export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine type dari route path
  const isProject = location.pathname.startsWith("/project/");
  const type = isProject ? "project" : "portfolio";
  
  // Use appropriate hook
  const projectData = useProject(isProject ? id : null);
  const portfolioData = usePortfolio(!isProject ? id : null);
  
  const data = isProject ? projectData.project : portfolioData.portfolio;
  const loading = isProject ? projectData.loading : portfolioData.loading;
  const error = isProject ? projectData.error : portfolioData.error;
  const refetch = isProject ? projectData.refetch : portfolioData.refetch;
  const { user: currentUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  
  // Check if current user is owner
  const isOwner = data && currentUser && (
    (isProject && data.owner?.id === currentUser.id) ||
    (!isProject && data.user_id === currentUser.id)
  );
  
  // Loading state
  if (loading) {
    return <DetailSkeleton />;
  }
  
  // Error state
  if (error) {
    return (
      <div className="py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="flex gap-2">
            <Button onClick={refetch} variant="primary">
              Retry
            </Button>
            <Button onClick={() => navigate("/")} variant="secondary">
              Back to Showcase
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Not found state
  if (!data) {
    return (
      <div className="py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            {type === "project" ? "Project" : "Portfolio"} Not Found
          </h2>
          <p className="text-[var(--foreground)]/60 mb-4">
            The {type} you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")} variant="primary">
            Back to Showcase
          </Button>
        </div>
      </div>
    );
  }
  
  const title = data.showcase_title || data.name || "Untitled";
  const description = data.showcase_description || data.description || "";
  const thumbnailUrl = data.thumbnail_url;
  const owner = data.owner || data.user;
  const deployUrl = data.deploy_url;
  const youtubeLink = data.youtube_link;
  const tags = data.tags || [];
  const teamMembers = data.team_members || [];
  const createdDate = data.created_at;
  const updatedDate = data.updated_at;
  const repoUrl = data.repo_url;
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  const currentUrl = window.location.href;
  
  const handleSave = async (formData) => {
    try {
      // Import services
      const { updateProject } = await import("../services/projectService");
      const { updatePortfolio } = await import("../services/portfolioService");
      
      if (isProject) {
        await updateProject(id, formData);
      } else {
        await updatePortfolio(id, formData);
      }
      
      setIsEditModalOpen(false);
      if (refetch) {
        refetch();
      }
      // Show success toast (akan diimplementasi dengan toast system)
      console.log("Update successful");
    } catch (err) {
      console.error("Update failed:", err);
      // Show error toast
      throw err; // Re-throw untuk handle di EditForm
    }
  };
  
  const handleToggleVisibility = async () => {
    if (!isOwner || !data) return;
    
    setIsToggling(true);
    try {
      const { updateProject } = await import("../services/projectService");
      const { updatePortfolio } = await import("../services/portfolioService");
      
      const newVisibility = !(data.is_showcased !== false); // Toggle current value
      
      if (isProject) {
        await updateProject(id, { is_showcased: newVisibility });
      } else {
        await updatePortfolio(id, { is_showcased: newVisibility });
      }
      
      if (refetch) {
        refetch();
      }
      console.log(`${newVisibility ? "Shown" : "Hidden"} successfully`);
    } catch (err) {
      console.error("Toggle visibility failed:", err);
      // Show error toast
    } finally {
      setIsToggling(false);
    }
  };
  
  const isShowcased = data?.is_showcased !== false; // Default to true if not set
  
  return (
    <div className="py-8">
      {/* Back Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Showcase
      </Button>
      
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  type === "project"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {type === "project" ? "Project" : "Portfolio"}
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-500/20 text-green-400">
                Deployed
              </span>
              {isOwner && (
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1 ${
                    isShowcased
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {isShowcased ? (
                    <>
                      <Eye className="h-3 w-3" />
                      Public
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3" />
                      Hidden
                    </>
                  )}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
              {title}
            </h1>
          </div>
          
          {/* Owner Actions */}
          {isOwner && (
            <div className="flex items-center gap-2">
              {/* Quick Toggle Visibility */}
              <Button
                variant={isShowcased ? "secondary" : "accent"}
                size="sm"
                onClick={handleToggleVisibility}
                disabled={isToggling}
                title={isShowcased ? "Hide from showcase" : "Show in showcase"}
              >
                {isToggling ? (
                  <Spinner size="sm" />
                ) : isShowcased ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Show
                  </>
                )}
              </Button>
              
              {/* Edit Button */}
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          )}
        </div>
        
        {/* Thumbnail */}
        {thumbnailUrl && (
          <div className="w-full h-64 md:h-96 bg-[var(--muted)] rounded-lg overflow-hidden mb-6">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Description Section */}
      {description && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
            Description
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-[var(--foreground)]/80 leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>
      )}
      
      {/* Info Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
          Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {owner && (
            <div className="flex items-center gap-3 p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
              <User className="h-5 w-5 text-[var(--foreground)]/60" />
              <div>
                <p className="text-sm text-[var(--foreground)]/60">Owner</p>
                <p className="font-medium text-[var(--foreground)]">
                  {owner.name || owner.email || "Unknown"}
                </p>
              </div>
            </div>
          )}
          
          {createdDate && (
            <div className="flex items-center gap-3 p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
              <Calendar className="h-5 w-5 text-[var(--foreground)]/60" />
              <div>
                <p className="text-sm text-[var(--foreground)]/60">Created</p>
                <p className="font-medium text-[var(--foreground)]">
                  {formatDate(createdDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Links Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
          Links
        </h2>
        <div className="flex flex-wrap gap-3">
          {deployUrl && (
            <Button
              variant="accent"
              onClick={() => window.open(deployUrl, "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          )}
          
          {youtubeLink && (
            <Button
              variant="secondary"
              onClick={() => window.open(youtubeLink, "_blank", "noopener,noreferrer")}
            >
              <Youtube className="h-4 w-4 mr-2" />
              Watch on YouTube
            </Button>
          )}
          
          {repoUrl && (
            <Button
              variant="secondary"
              onClick={() => window.open(repoUrl, "_blank", "noopener,noreferrer")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Repository
            </Button>
          )}
        </div>
      </div>
      
      {/* Team Members Section */}
      {teamMembers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
            Team Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      )}
      
      {/* Tags Section */}
      {tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Share Buttons */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
          Share
        </h2>
        <ShareButtons url={currentUrl} title={title} description={description} />
      </div>
      
      {/* Edit Modal */}
      {isOwner && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          item={data}
          type={type}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
