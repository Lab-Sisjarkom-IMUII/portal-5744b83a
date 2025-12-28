import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProjects } from "../hooks/useProjects";
import {
  getEventById,
  getEventProjects,
  registerProjectToEvent,
  unregisterProjectFromEvent,
} from "../services/eventService";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { Modal } from "../components/Modal";
import { ProjectCard } from "../components/ProjectCard";
import { SearchBar } from "../components/SearchBar";

export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { projects, loading: loadingProjects } = useProjects();

  const [event, setEvent] = useState(null);
  const [eventProjects, setEventProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registeringProjectId, setRegisteringProjectId] = useState(null);
  const [unregisteringProjectId, setUnregisteringProjectId] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sort: "newest",
  });

  const isEnded = event?.status === "ended";

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [eventData, projectsData] = await Promise.all([
        getEventById(id),
        getEventProjects(id),
      ]);

      setEvent(eventData || null);
      setEventProjects(Array.isArray(projectsData) ? projectsData : []);
    } catch (err) {
      console.error("Failed to load event detail:", err);
      setError(err.message || "Failed to load event detail");
      setEvent(null);
      setEventProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const projectsAlreadyRegisteredIds = useMemo(() => {
    return new Set((eventProjects || []).map((p) => p.id));
  }, [eventProjects]);

  const myRegisteredProjects = useMemo(() => {
    return (projects || []).filter((project) =>
      projectsAlreadyRegisteredIds.has(project.id)
    );
  }, [projects, projectsAlreadyRegisteredIds]);

  const availableProjectsToRegister = useMemo(() => {
    return (projects || []).filter(
      (project) => !projectsAlreadyRegisteredIds.has(project.id)
    );
  }, [projects, projectsAlreadyRegisteredIds]);

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let filtered = [...eventProjects];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.owner?.name?.toLowerCase().includes(query) ||
          project.owner?.email?.toLowerCase().includes(query)
      );
    }

    // Sort
    if (filters.sort === "newest") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.registered_at || a.created_at || 0);
        const dateB = new Date(b.registered_at || b.created_at || 0);
        return dateB - dateA;
      });
    } else if (filters.sort === "oldest") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.registered_at || a.created_at || 0);
        const dateB = new Date(b.registered_at || b.created_at || 0);
        return dateA - dateB;
      });
    } else if (filters.sort === "alphabetical-az") {
      filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (filters.sort === "alphabetical-za") {
      filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    return filtered;
  }, [eventProjects, searchQuery, filters]);

  // Get unique owners for filter
  const uniqueOwners = useMemo(() => {
    const ownerMap = new Map();
    eventProjects.forEach((project) => {
      if (project.owner?.id) {
        ownerMap.set(project.owner.id, project.owner);
      }
    });
    return Array.from(ownerMap.values());
  }, [eventProjects]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({ sort: "newest" });
  };

  const hasActiveFilters = searchQuery.trim() !== "" || filters.sort !== "newest";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRegister = async (projectId) => {
    if (!projectId) return;
    setRegisteringProjectId(projectId);
    setActionError(null);

    try {
      await registerProjectToEvent(id, projectId);
      await loadData();
      setIsRegisterModalOpen(false);
    } catch (err) {
      console.error("Failed to register project:", err);
      setActionError(err.message || "Gagal mendaftarkan project ke event");
    } finally {
      setRegisteringProjectId(null);
    }
  };

  const handleUnregister = async (projectId) => {
    if (!projectId) return;
    setUnregisteringProjectId(projectId);
    setActionError(null);

    try {
      await unregisterProjectFromEvent(id, projectId);
      await loadData();
    } catch (err) {
      console.error("Failed to unregister project:", err);
      setActionError(err.message || "Gagal membatalkan pendaftaran project");
    } finally {
      setUnregisteringProjectId(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="text-[var(--foreground)]/60 text-sm">
            Memuat detail event...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500">
            {error || "Event tidak ditemukan atau terjadi kesalahan."}
          </p>
          <Button onClick={loadData}>Coba lagi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            {event.name}
          </h1>
          <span
            className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${
                event.status === "active"
                  ? "bg-green-500/20 text-green-400"
                  : event.status === "upcoming"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-red-500/20 text-red-400"
              }
            `}
          >
            {event.status}
          </span>
        </div>

        <p className="text-[var(--foreground)]/60 mb-3">
          {event.description}
        </p>

        <div className="text-sm text-[var(--foreground)]/70 space-y-1">
          <p>
            Periode:{" "}
            <span className="font-medium">
              {formatDate(event.start_date)} - {formatDate(event.end_date)}
            </span>
          </p>
          <p>
            Total project terdaftar:{" "}
            <span className="font-medium">{event.project_count ?? 0}</span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-8 space-y-3">
        {actionError && (
          <div className="p-3 rounded-lg border border-red-500/40 bg-red-500/5 text-sm text-red-500">
            {actionError}
          </div>
        )}

        {!isAuthenticated ? (
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--muted)]/40">
            <p className="text-sm text-[var(--foreground)]/70">
              Login terlebih dahulu untuk mendaftarkan project ke event ini.
            </p>
          </div>
        ) : isEnded ? (
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--muted)]/40">
            <p className="text-sm text-[var(--foreground)]/70">
              Event ini sudah berakhir. Pendaftaran project baru sudah
              ditutup.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--muted)]/40">
            <div className="text-sm text-[var(--foreground)]/70">
              {loadingProjects ? (
                <span>Memuat project kamu...</span>
              ) : myRegisteredProjects.length > 0 ? (
                <span>
                  Kamu memiliki{" "}
                  <span className="font-medium">
                    {myRegisteredProjects.length} project
                  </span>{" "}
                  yang terdaftar di event ini.
                </span>
              ) : (
                <span>
                  Belum ada project kamu yang terdaftar di event ini.
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Projects in this event */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Projects in this Event ({eventProjects.length})
          </h2>
          {isAuthenticated && !isEnded && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsRegisterModalOpen(true)}
              disabled={loadingProjects || availableProjectsToRegister.length === 0}
            >
              {availableProjectsToRegister.length === 0
                ? "Tidak ada project yang bisa didaftarkan"
                : "Register a project"}
            </Button>
          )}
        </div>

        {/* Search and Filter */}
        {eventProjects.length > 0 && (
          <div className="space-y-3">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search projects..."
            />
            <div className="flex flex-wrap items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
              {/* Sort Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-[var(--foreground)]/70">
                  Sort:
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                  className="px-3 py-1 text-sm bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical-az">A-Z</option>
                  <option value="alphabetical-za">Z-A</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClearFilters}
                  className="ml-auto"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        )}

        {eventProjects.length === 0 ? (
          <p className="text-sm text-[var(--foreground)]/60">
            Belum ada project yang terdaftar di event ini.
          </p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-sm text-[var(--foreground)]/60">
            Tidak ada project yang sesuai dengan filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => {
              const isMyProject = (projects || []).some(
                (p) => p.id === project.id
              );

              // Prepare project data for ProjectCard
              const projectData = {
                ...project,
                type: "project",
                showcase_title: project.showcase_title || project.name,
                showcase_description: project.showcase_description || project.description,
                deploy_url: project.deploy_url || (project.domain ? `https://${project.domain}` : null),
              };

              return (
                <div key={project.id} className="relative">
                  <ProjectCard item={projectData} />
                  {isAuthenticated && isMyProject && !isEnded && (
                    <div className="absolute top-2 right-2 z-10">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnregister(project.id);
                        }}
                        loading={unregisteringProjectId === project.id}
                        disabled={unregisteringProjectId === project.id}
                      >
                        Unregister
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => {
          if (!registeringProjectId) {
            setIsRegisterModalOpen(false);
            setActionError(null);
          }
        }}
        title="Register a project"
      >
        {loadingProjects ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Spinner size="sm" />
            <p className="text-sm text-[var(--foreground)]/60">
              Memuat project kamu...
            </p>
          </div>
        ) : availableProjectsToRegister.length === 0 ? (
          <p className="text-sm text-[var(--foreground)]/70">
            Semua project kamu sudah terdaftar di event ini atau tidak ada
            project yang tersedia untuk didaftarkan.
          </p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-[var(--foreground)]/70">
              Pilih salah satu project kamu untuk didaftarkan ke event ini.
            </p>
            <div className="space-y-2">
              {availableProjectsToRegister.map((project) => (
                <Card
                  key={project.id}
                  className="p-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {project.name}
                    </p>
                    {project.description && (
                      <p className="text-xs text-[var(--foreground)]/60 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleRegister(project.id)}
                    loading={registeringProjectId === project.id}
                    disabled={registeringProjectId === project.id}
                  >
                    Register
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

