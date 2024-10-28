import React, { useState } from "react";
import { Search, Calendar, Users, X } from "lucide-react";

export function SearchCard() {
  const [searchParams, setSearchParams] = useState({
    title: "",
    date: "",
    organizer: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const isSearchValid = () => {
    return Object.values(searchParams).some((value) => value.trim() !== "");
  };

  const handleSearch = async () => {
    if (!isSearchValid()) {
      return;
    }

    try {
      setIsLoading(true);
      setHasSearched(true);

      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value.trim()) queryParams.append(key, value.trim());
      });

      const response = await fetch(
        `http://localhost:3503/api/events/search?${queryParams}`
      );
      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-3xl w-full mx-auto transform transition-all">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Find Your Next Experience
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Event Title
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Search events..."
                value={searchParams.title}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={searchParams.date}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, date: e.target.value }))
                }
              />
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Organizer
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter organizer..."
                value={searchParams.organizer}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    organizer: e.target.value,
                  }))
                }
              />
              <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className={`px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all 
              ${
                isSearchValid()
                  ? "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            onClick={handleSearch}
            disabled={isLoading || !isSearchValid()}
          >
            {isLoading ? "Searching..." : "Search Events"}
          </button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-3xl w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Search Results
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {searchResults.map((event) => (
              <div
                key={event.EventID}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {event.EventName}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(event.EventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.GuestListOwner}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasSearched && searchResults.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No events found
        </div>
      )}
    </div>
  );
}
