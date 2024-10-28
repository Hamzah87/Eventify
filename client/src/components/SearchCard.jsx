import React from "react";
import { Search, Calendar, Users } from "lucide-react";

export function SearchCard() {
  return (
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
            />
            <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
          Search Events
        </button>
      </div>
    </div>
  );
}
