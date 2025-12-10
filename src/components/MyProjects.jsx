import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { deleteProject } from "../services/projectService";
import { useProjects } from "../hooks/useProjects";

/**
 * MyProjects Component
 * Display user's projects with View, Edit, Delete actions
 * @param {Function} onRefetch - Callback untuk refetch setelah delete (optional)
 */
export function MyProjects({ onRefetch }) {
  const navigate = useNavigate();
  const { projects, loading, error, refetch } = useProjects();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (projectId, projectName) => {
    setDeletingId(projectId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    setDeleting(true);
    try {
      await deleteProject(deletingId);
      // Refetch projects
      await refetch();
      // Call parent refetch if provided
      if (onRefetch) {
        onRefetch();
      }
      setDeleteModalOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert(error.message || "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDeletingId(null);
  };

  const getProjectName = (project) => {
    return project.showcase_title || project.name || "Untitled Project";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button variant="secondary" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          My Projects ({projects.length})
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            // Future: Navigate to create project page
            alert("Create project feature coming soon!");
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Create New
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-[var(--foreground)]/60 mb-4">
            You don't have any projects yet.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              alert("Create project feature coming soon!");
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Your First Project
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const projectName = getProjectName(project);
            const thumbnailUrl = project.thumbnail_url;
            const description = project.showcase_description || project.description || "";

            return (
              <Card key={project.id} className="overflow-hidden">
                {/* Thumbnail */}
                <div className="w-full h-40 bg-[var(--muted)] overflow-hidden">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={projectName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20">
                      <div className="text-3xl font-bold text-[var(--primary)]/50">
                        {projectName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-[var(--foreground)] line-clamp-2">
                    {projectName}
                  </h3>
                  {description && (
                    <p className="text-sm text-[var(--foreground)]/70 line-clamp-2">
                      {description}
                    </p>
                  )}

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        project.is_showcased !== false
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {project.is_showcased !== false ? "Showcased" : "Hidden"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/project/${project.id}/edit`)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDelete(project.id, projectName)}
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemName={deletingId ? getProjectName(projects.find(p => p.id === deletingId)) : ""}
        loading={deleting}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
}

