import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Loader2 } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { getMyEvents } from "../services/eventService";

/**
 * MyEvents Component
 * Menampilkan events yang diikuti user (events yang berisi projects milik user)
 */
export function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMyEvents();
      const eventsData = Array.isArray(response?.events)
        ? response.events
        : Array.isArray(response)
        ? response
        : [];
      setEvents(eventsData);
    } catch (err) {
      console.error("Failed to fetch my events:", err);
      setError(err.message || "Failed to fetch my events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Events yang Diikuti
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="secondary" onClick={fetchMyEvents}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Events yang Diikuti ({events.length})
        </h2>
      </div>

      {/* Empty state */}
      {events.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-[var(--foreground)]/60">
            Belum ada event yang diikuti.
          </p>
          <p className="text-[var(--foreground)]/40 text-sm mt-2">
            Kamu bisa mendaftarkan project ke event melalui halaman Events.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {event.name}
                  </h3>
                  {event.description && (
                    <p className="text-sm text-[var(--foreground)]/70 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
                <span
                  className={`
                    px-2 py-1 rounded-full text-xs font-medium
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

              <div className="text-xs text-[var(--foreground)]/60 space-y-1">
                <p className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDate(event.start_date)} -{" "}
                    {formatDate(event.end_date)}
                  </span>
                </p>
                {Array.isArray(event.my_projects) && event.my_projects.length > 0 && (
                  <p>
                    My projects in this event:{" "}
                    <span className="font-medium">
                      {event.my_projects.length}
                    </span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  View Event
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

