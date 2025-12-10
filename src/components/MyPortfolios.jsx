import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { deletePortfolio } from "../services/portfolioService";
import { usePortfolios } from "../hooks/usePortfolios";

/**
 * MyPortfolios Component
 * Display user's portfolios with View, Edit, Delete actions
 * @param {Function} onRefetch - Callback untuk refetch setelah delete (optional)
 */
export function MyPortfolios({ onRefetch }) {
  const navigate = useNavigate();
  const { portfolios, loading, error, refetch } = usePortfolios();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (portfolioId, portfolioName) => {
    setDeletingId(portfolioId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;

    setDeleting(true);
    try {
      await deletePortfolio(deletingId);
      // Refetch portfolios
      await refetch();
      // Call parent refetch if provided
      if (onRefetch) {
        onRefetch();
      }
      setDeleteModalOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      alert(error.message || "Failed to delete portfolio");
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDeletingId(null);
  };

  const getPortfolioName = (portfolio) => {
    return portfolio.showcase_title || portfolio.name || "Untitled Portfolio";
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
          My Portfolios ({portfolios.length})
        </h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            // Future: Navigate to create portfolio page
            alert("Create portfolio feature coming soon!");
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Create New
        </Button>
      </div>

      {/* Portfolios Grid */}
      {portfolios.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-[var(--foreground)]/60 mb-4">
            You don't have any portfolios yet.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              alert("Create portfolio feature coming soon!");
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Your First Portfolio
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolios.map((portfolio) => {
            const portfolioName = getPortfolioName(portfolio);
            const thumbnailUrl = portfolio.thumbnail_url;
            const description = portfolio.showcase_description || portfolio.description || "";

            return (
              <Card key={portfolio.id} className="overflow-hidden">
                {/* Thumbnail */}
                <div className="w-full h-40 bg-[var(--muted)] overflow-hidden">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={portfolioName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                      <div className="text-3xl font-bold text-purple-400/50">
                        {portfolioName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-[var(--foreground)] line-clamp-2">
                    {portfolioName}
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
                        portfolio.is_showcased !== false
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {portfolio.is_showcased !== false ? "Showcased" : "Hidden"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/portfolio/${portfolio.id}/edit`)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDelete(portfolio.id, portfolioName)}
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
        itemName={deletingId ? getPortfolioName(portfolios.find(p => p.id === deletingId)) : ""}
        loading={deleting}
        title="Delete Portfolio"
        message="Are you sure you want to delete this portfolio? This action cannot be undone."
      />
    </div>
  );
}

