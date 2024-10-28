import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";

function Events() {
  const [events, setEvents] = useState([]); // State to store events data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/events/all"); // API endpoint
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setEvents(data); // Update events with data from the database
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ThemeProvider>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 py-10 px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Upcoming Events</h2>

        {/* Display a loading message if data is still being fetched */}
        {isLoading ? (
          <p className="text-white text-center">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-white text-center">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{event.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Type:</strong> {event.type}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Location:</strong> {event.location}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Date:</strong> {event.date}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Guests:</strong> {event.guests}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Host:</strong> {event.hostName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Events;
