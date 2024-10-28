import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";

function CreateEvent() {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventType: "",
    location: "",
    date: "",
    guests: "",
    hostName: "",
    hostEmail: "",
    hostPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Details:", eventDetails);
  };

  return (
    <ThemeProvider>
      <Navbar />
      {/* Wrapping content in a container that provides spacing from the navbar */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 min-h-screen flex flex-col items-center justify-start pt-20 pb-10">
        <h2 className="text-3xl font-bold text-white mb-6">Create Your Event</h2>
        <form
          className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl" // increased width with max-w-2xl
          onSubmit={handleSubmit}
        >
          {/* Event Name */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Event Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              type="text"
              name="eventName"
              value={eventDetails.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
          </div>

          {/* Event Type */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Event Type
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              name="eventType"
              value={eventDetails.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select event type</option>
              <option value="Conference">Conference</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Party">Party</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Location
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              type="text"
              name="location"
              value={eventDetails.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Date
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Number of Guests */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Number of Guests
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              type="number"
              name="guests"
              value={eventDetails.guests}
              onChange={handleChange}
              placeholder="Enter number of guests"
              required
            />
          </div>

          {/* Host Contact Information */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Host Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              type="text"
              name="hostName"
              value={eventDetails.hostName}
              onChange={handleChange}
              placeholder="Enter host's name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Host Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              type="email"
              name="hostEmail"
              value={eventDetails.hostEmail}
              onChange={handleChange}
              placeholder="Enter host's email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Host Phone
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              type="tel"
              name="hostPhone"
              value={eventDetails.hostPhone}
              onChange={handleChange}
              placeholder="Enter host's phone number"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default CreateEvent;
