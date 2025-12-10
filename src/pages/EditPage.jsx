import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";
import { EditForm } from "../components/EditForm";
import { useProject } from "../hooks/useProject";
import { usePortfolio } from "../hooks/usePortfolio";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/Spinner";
import { updateProject } from "../services/projectService";
import { updatePortfolio } from "../services/portfolioService";
import { ProtectedRoute } from "../components/ProtectedRoute";

/**
 * Edit Page untuk project atau portfolio
 * Halaman dedicated untuk edit (bukan modal)
 */
export function EditPage() {
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
  const [isSaving, setIsSaving] = useState(false);
  
  // Check if current user is owner
  const isOwner = data && currentUser && (
    (isProject && data.owner?.id === currentUser.id) ||
    (!isProject && data.user_id === currentUser.id)
  );
  
  // Redirect if not owner
  useEffect(() => {
    if (!loading && data && !isOwner) {
      // Redirect to detail page if not owner
      navigate(isProject ? `/project/${id}` : `/portfolio/${id}`);
    }
  }, [loading, data, isOwner, navigate, isProject, id]);
  
  // Loading state
  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </div>
    );
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
  
  // Not owner state (will redirect, but show message briefly)
  if (!isOwner) {
    return (
      <div className="py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-[var(--foreground)]/60">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }
  
  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      if (isProject) {
        await updateProject(id, formData);
      } else {
        await updatePortfolio(id, formData);
      }
      
      // Refetch data to get updated values
      if (refetch) {
        await refetch();
      }
      
      // Navigate back to detail page
      navigate(isProject ? `/project/${id}` : `/portfolio/${id}`);
    } catch (err) {
      console.error("Failed to update:", err);
      throw err; // Let EditForm handle the error display
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigate(isProject ? `/project/${id}` : `/portfolio/${id}`);
  };
  
  return (
    <ProtectedRoute>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {type === "project" ? "Project" : "Portfolio"}
            </Button>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Edit {type === "project" ? "Project" : "Portfolio"}
            </h1>
            <p className="text-[var(--foreground)]/60 mt-2">
              Update the showcase information for your {type}
            </p>
          </div>
          
          {/* Edit Form */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
            <EditForm
              item={data}
              type={type}
              onSubmit={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

