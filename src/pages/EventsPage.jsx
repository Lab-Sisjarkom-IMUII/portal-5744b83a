import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../services/eventService";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "upcoming", label: "Upcoming" },
  { value: "ended", label: "Ended" },
];

export function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const { events: fetchedEvents } = await getEvents({
          status: statusFilter,
          page: 1,
          limit: 100,
        });

        if (isMounted) {
          setEvents(Array.isArray(fetchedEvents) ? fetchedEvents : []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch events:", err);
          setError(err.message || "Failed to fetch events");
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [statusFilter]);

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;

    const q = searchQuery.toLowerCase();
    return events.filter((event) => {
      const name = (event.name || "").toLowerCase();
      const description = (event.description || "").toLowerCase();
      return name.includes(q) || description.includes(q);
    });
  }, [events, searchQuery]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "upcoming":
        return "bg-blue-500/20 text-blue-400";
      case "ended":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-[var(--muted)] text-[var(--foreground)]/70";
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/events/${id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="text-[var(--foreground)]/60 text-sm">
            Memuat daftar events...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => setStatusFilter(statusFilter)}>
            Coba lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      {/* Header / Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          Events
        </h1>
        <p className="text-[var(--foreground)]/60 max-w-2xl">
          Jelajahi berbagai event yang diselenggarakan untuk menampilkan dan
          mengapresiasi project-project di IMUII. Kamu bisa melihat detail event
          dan mendaftarkan project-mu ketika event sedang aktif atau upcoming.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setStatusFilter(option.value)}
              className={`
                px-3 py-1.5 rounded-full text-sm border transition-colors
                ${
                  statusFilter === option.value
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-[var(--background)] text-[var(--foreground)]/70 border-[var(--border)] hover:bg-[var(--muted)]"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari event..."
            className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-[var(--foreground)]/60">
        {filteredEvents.length === events.length ? (
          <span>Menampilkan {events.length} event</span>
        ) : (
          <span>
            Menampilkan {filteredEvents.length} dari {events.length} event
          </span>
        )}
      </div>

      {/* Empty state */}
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <p className="text-[var(--foreground)]/60 text-lg mb-2">
            Belum ada event yang sesuai.
          </p>
          <p className="text-[var(--foreground)]/40 text-sm">
            Coba ubah filter status atau kata kunci pencarian.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="flex flex-col justify-between">
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-semibold text-[var(--foreground)] line-clamp-2">
                    {event.name}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                </div>

                {event.description && (
                  <p className="text-sm text-[var(--foreground)]/70 line-clamp-3">
                    {event.description}
                  </p>
                )}

                <div className="text-xs text-[var(--foreground)]/60 space-y-1">
                  <p>
                    Periode:{" "}
                    <span className="font-medium">
                      {formatDate(event.start_date)} -{" "}
                      {formatDate(event.end_date)}
                    </span>
                  </p>
                  <p>
                    Project terdaftar:{" "}
                    <span className="font-medium">
                      {event.project_count ?? 0}
                    </span>
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleViewDetail(event.id)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

