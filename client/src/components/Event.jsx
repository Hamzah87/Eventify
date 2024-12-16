import React, { useState, useEffect } from "react";
import { API_URL } from "../config";

const Event = () => {
  const [isAttending, setIsAttending] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    const checkAttendance = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/events/${eventId}/attendance`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setIsAttending(data.isAttending);
      } catch (error) {
        console.error("Error checking attendance:", error);
      }
    };

    checkAttendance();
  }, [eventId]);

  const handleUnattend = async () => {
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
        setIsAttending(false);
      }
    } catch (error) {
      console.error("Error removing attendance:", error);
    }
  };

  return (
    <div>
      {isAttending ? (
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Remove Attendance
        </button>
      ) : (
        <button
          onClick={handleAttend}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Attend Event
        </button>
      )}

      {isConfirmOpen && (
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
                  handleUnattend();
                  setIsConfirmOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
