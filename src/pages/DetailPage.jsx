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
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { useEffect, useMemo, useState, useCallback } from "react";
import { getEvents, getEventProjects, registerProjectToEvent, unregisterProjectFromEvent } from "../services/eventService";

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
  const [isToggling, setIsToggling] = useState(false);
  const [manageEventsOpen, setManageEventsOpen] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  const [events, setEvents] = useState([]);
  const [membershipByEventId, setMembershipByEventId] = useState({});
  const [actionByEventId, setActionByEventId] = useState({});
  const [eventsActionError, setEventsActionError] = useState(null);
  
  // Memindahkan useMemo ke sini SEBELUM early returns untuk memastikan hook dipanggil dalam urutan yang sama
  const joinedEvents = useMemo(() => {
    return (events || []).filter((evt) => membershipByEventId?.[evt.id]);
  }, [events, membershipByEventId]);

  const availableEvents = useMemo(() => {
    return (events || []).filter((evt) => !membershipByEventId?.[evt.id]);
  }, [events, membershipByEventId]);

  // Project ID untuk event management (hanya untuk project)
  const projectId = isProject ? data?.id : null;

  // Load events function - menggunakan useCallback untuk memastikan dependency yang benar
  const loadEventsAndMembership = useCallback(async () => {
    if (!isProject || !projectId) return;

    setEventsLoading(true);
    setEventsError(null);
    setEventsActionError(null);

    try {
      const [activeRes, upcomingRes] = await Promise.all([
        getEvents({ status: "active", page: 1, limit: 100 }),
        getEvents({ status: "upcoming", page: 1, limit: 100 }),
      ]);

      const combined = [...(activeRes?.events || []), ...(upcomingRes?.events || [])];
      const uniqueById = new Map();
      combined.forEach((evt) => {
        if (evt?.id && !uniqueById.has(evt.id)) uniqueById.set(evt.id, evt);
      });
      const uniqueEvents = Array.from(uniqueById.values());
      setEvents(uniqueEvents);

      // Membership check per event (O(N) requests) - sesuai pilihan tanpa endpoint baru
      const membershipPairs = await Promise.all(
        uniqueEvents.map(async (evt) => {
          try {
            const projectsInEvent = await getEventProjects(evt.id);
            const isJoined = (projectsInEvent || []).some((p) => p?.id === projectId);
            return [evt.id, isJoined];
          } catch (err) {
            console.error("Failed to check event membership:", evt?.id, err);
            return [evt.id, false];
          }
        })
      );

      const nextMembership = {};
      membershipPairs.forEach(([eventId, isJoined]) => {
        nextMembership[eventId] = !!isJoined;
      });
      setMembershipByEventId(nextMembership);
    } catch (err) {
      console.error("Failed to load events for project:", err);
      setEventsError(err.message || "Gagal memuat daftar events");
      setEvents([]);
      setMembershipByEventId({});
    } finally {
      setEventsLoading(false);
    }
  }, [isProject, projectId]);

  // Lazy load saat modal dibuka, supaya tidak membanjiri request saat buka detail project
  // Dipindahkan ke sini SEBELUM early returns
  useEffect(() => {
    if (manageEventsOpen && isProject && projectId) {
      loadEventsAndMembership();
    }
  }, [manageEventsOpen, isProject, projectId, loadEventsAndMembership]);
  
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

  const handleJoinEventForProject = async (eventId) => {
    if (!eventId || !projectId) return;
    setEventsActionError(null);
    setActionByEventId((prev) => ({ ...prev, [eventId]: "join" }));

    try {
      await registerProjectToEvent(eventId, projectId);
      setMembershipByEventId((prev) => ({ ...prev, [eventId]: true }));
    } catch (err) {
      console.error("Join event failed:", err);
      setEventsActionError(err.message || "Gagal mendaftarkan project ke event");
    } finally {
      setActionByEventId((prev) => {
        const next = { ...prev };
        delete next[eventId];
        return next;
      });
    }
  };

  const handleLeaveEventForProject = async (eventId) => {
    if (!eventId || !projectId) return;
    setEventsActionError(null);
    setActionByEventId((prev) => ({ ...prev, [eventId]: "leave" }));

    try {
      await unregisterProjectFromEvent(eventId, projectId);
      setMembershipByEventId((prev) => ({ ...prev, [eventId]: false }));
    } catch (err) {
      console.error("Leave event failed:", err);
      setEventsActionError(err.message || "Gagal membatalkan project dari event");
    } finally {
      setActionByEventId((prev) => {
        const next = { ...prev };
        delete next[eventId];
        return next;
      });
    }
  };
  
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
                onClick={() => navigate(isProject ? `/project/${id}/edit` : `/portfolio/${id}/edit`)}
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

      {/* Joined Events (Project Only) */}
      {isProject && (
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">
              Joined Events
            </h2>
            {isOwner && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setManageEventsOpen(true)}
              >
                Manage Events
              </Button>
            )}
          </div>

          {!currentUser && (
            <p className="text-sm text-[var(--foreground)]/60 mb-3">
              Login untuk mengelola event. Kamu tetap bisa melihat daftar event yang tersedia dari menu Events.
            </p>
          )}

          {joinedEvents.length === 0 ? (
            <Card className="p-5">
              <p className="text-sm text-[var(--foreground)]/70">
                Project ini belum terdaftar pada event mana pun.
              </p>
              <p className="text-xs text-[var(--foreground)]/50 mt-1">
                {isOwner
                  ? "Klik “Manage Events” untuk mendaftarkan project ke event."
                  : "Hanya owner project yang dapat mendaftarkan project ke event."}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {joinedEvents.map((evt) => (
                <Card key={evt.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-base font-semibold text-[var(--foreground)]">
                        {evt.name}
                      </p>
                      {evt.description && (
                        <p className="text-sm text-[var(--foreground)]/70 line-clamp-2">
                          {evt.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        evt.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : evt.status === "upcoming"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/events/${evt.id}`)}
                    >
                      View Event
                    </Button>
                    {isOwner && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleLeaveEventForProject(evt.id)}
                        loading={actionByEventId?.[evt.id] === "leave"}
                        disabled={actionByEventId?.[evt.id] === "leave"}
                      >
                        Leave
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Manage Events Modal (Project Only) */}
      {isProject && (
        <Modal
          isOpen={manageEventsOpen}
          onClose={() => {
            const anyAction = Object.keys(actionByEventId || {}).length > 0;
            if (!anyAction) {
              setManageEventsOpen(false);
              setEventsActionError(null);
            }
          }}
          title="Manage Events"
          className="max-w-2xl"
        >
          {eventsActionError && (
            <div className="mb-4 p-3 rounded-lg border border-red-500/40 bg-red-500/5 text-sm text-red-500">
              {eventsActionError}
            </div>
          )}

          {eventsLoading ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <Spinner />
              <p className="text-sm text-[var(--foreground)]/60">
                Memuat events...
              </p>
            </div>
          ) : eventsError ? (
            <div className="space-y-3">
              <p className="text-red-500 text-sm">{eventsError}</p>
              <Button variant="secondary" onClick={loadEventsAndMembership}>
                Retry
              </Button>
            </div>
          ) : events.length === 0 ? (
            <p className="text-sm text-[var(--foreground)]/70">
              Belum ada event aktif atau upcoming.
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-[var(--foreground)]/70">
                Pilih event untuk mendaftarkan project ini. Kamu juga bisa keluar (leave) dari event yang sudah diikuti.
              </p>

              <div className="space-y-2">
                {events.map((evt) => {
                  const isJoined = !!membershipByEventId?.[evt.id];
                  const isActing = !!actionByEventId?.[evt.id];
                  const actionType = actionByEventId?.[evt.id];

                  return (
                    <Card
                      key={evt.id}
                      className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[var(--foreground)] truncate">
                            {evt.name}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              evt.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : evt.status === "upcoming"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {evt.status}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              isJoined
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {isJoined ? "Joined" : "Not joined"}
                          </span>
                        </div>
                        {evt.description && (
                          <p className="text-xs text-[var(--foreground)]/60 line-clamp-2 mt-1">
                            {evt.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(`/events/${evt.id}`)}
                        >
                          View
                        </Button>
                        {isOwner && (
                          isJoined ? (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleLeaveEventForProject(evt.id)}
                              loading={isActing && actionType === "leave"}
                              disabled={isActing}
                            >
                              Leave
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleJoinEventForProject(evt.id)}
                              loading={isActing && actionType === "join"}
                              disabled={isActing}
                            >
                              Join
                            </Button>
                          )
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </Modal>
      )}
      
      {/* Share Buttons */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
          Share
        </h2>
        <ShareButtons url={currentUrl} title={title} description={description} />
      </div>
      
    </div>
  );
}
