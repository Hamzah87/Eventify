import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const API_URL = "http://localhost:3000";

export function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAttending, setIsAttending] = useState(false);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const { eventId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch event details");

      const data = await response.json();
      setEvent(data);
      if (user && data.attendees) {
        const isUserAttending = data.attendees.some(
          (attendee) =>
            attendee.AttendeeEmail === user.email ||
            attendee.attendee_email === user.email
        );
        setIsAttending(isUserAttending);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const handleAttendance = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isAttending) {
      setShowConfirmDialog(true);
      return;
    }

    setAttendanceLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}/reserve`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update attendance");

      const data = await response.json();
      if (data.success) {
        await fetchEventDetails();
        setIsAttending(true);
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      setError("Failed to update attendance");
    } finally {
      setAttendanceLoading(false);
    }
  };

  const handleRemoveAttendance = async () => {
    setAttendanceLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/events/${eventId}/unreserve`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to remove attendance");

      const data = await response.json();
      if (data.success) {
        await fetchEventDetails();
        setIsAttending(false);
        setShowConfirmDialog(false);
      }
    } catch (error) {
      console.error("Error removing attendance:", error);
      setError("Failed to remove attendance");
    } finally {
      setAttendanceLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || "Event not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {event.EventName}
            </h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(event.StartTime)}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="h-5 w-5 mr-2" />
                <span>
                  {formatTime(event.StartTime)} - {formatTime(event.EndTime)}
                </span>
              </div>
              {event.Location && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.Location}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="h-5 w-5 mr-2" />
                <span>
                  Organized by{" "}
                  <span className="font-medium">{event.OrganizerName}</span>
                </span>
              </div>
            </div>

            {event.Description && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  About this event
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {event.Description}
                </p>
              </div>
            )}

            <div className="border-t dark:border-gray-700 pt-6">
              {user ? (
                isAttending ? (
                  <button
                    onClick={() => setShowConfirmDialog(true)}
                    disabled={attendanceLoading}
                    className="w-full py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {attendanceLoading ? "Processing..." : "Remove Attendance"}
                  </button>
                ) : (
                  <button
                    onClick={handleAttendance}
                    disabled={attendanceLoading}
                    className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {attendanceLoading ? "Processing..." : "Attend"}
                  </button>
                )
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Log in or create an account to register for this event.
                </p>
              )}
            </div>

            {event.attendees && event.attendees.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Attendees ({event.attendees.length})
                </h2>
                <div className="space-y-2">
                  {event.attendees.map((attendee) => (
                    <div
                      key={attendee.AttendeeEmail}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      {attendee.AttendeeName}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Remove Attendance
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to remove your attendance from this event?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveAttendance}
                disabled={attendanceLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {attendanceLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
