import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Plus, Users } from "lucide-react";

const API_URL = "http://localhost:3000";

export function Dashboard() {
  const [myEvents, setMyEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchMyEvents(), fetchAttendingEvents()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const fetchMyEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setMyEvents(data.events);
      } else {
        setError("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error loading events:", error);
      setError("Error loading events");
    }
  };

  const fetchAttendingEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/attending`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setAttendingEvents(data.events);
      }
    } catch (error) {
      console.error("Error loading attended events:", error);
    }
  };

  const handleUnattend = async (eventId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/events/${eventId}/unreserve`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.success) {
        setAttendingEvents(
          attendingEvents.filter(
            (event) => (event.EventID || event.event_id) !== eventId
          )
        );
      } else {
        setError("Failed to remove attendance");
      }
    } catch (error) {
      console.error("Error removing attendance:", error);
      setError("Error removing attendance");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const EventCard = ({ event, isAttending }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {event.EventName || event.title}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{formatDate(event.StartTime || event.start_time)}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="h-5 w-5 mr-2" />
            <span>
              {formatTime(event.StartTime || event.start_time)} -{" "}
              {formatTime(event.EndTime || event.end_time)}
            </span>
          </div>
          {(event.Location || event.location) && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.Location || event.location}</span>
            </div>
          )}
          {isAttending && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="h-5 w-5 mr-2" />
              <span>
                Organized by {event.OrganizerName || event.organizer_name}
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {event.IsPublic || event.is_public ? "Public" : "Private"} Event
          </span>
          <button
            onClick={() =>
              navigate(`/events/${event.EventID || event.event_id}`)
            }
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const ConfirmDialog = () =>
    isConfirmOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Confirm Unattend
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to remove your attendance from this event?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleUnattend(selectedEventId);
                setIsConfirmOpen(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32">
      <ConfirmDialog />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Events
            </h1>
            <button
              onClick={() => navigate("/create-event")}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              Create Event
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <EventCard
                key={event.EventID || event.event_id}
                event={event}
                isAttending={false}
              />
            ))}
          </div>

          {myEvents.length === 0 && !error && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              You haven't created any events yet. Click the button above to
              create your first event!
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Events I'm Attending
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendingEvents.map((event) => (
              <EventCard
                key={event.EventID || event.event_id}
                event={event}
                isAttending={true}
              />
            ))}
          </div>

          {attendingEvents.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              You're not attending any events yet. Browse the events page to
              find interesting events!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
