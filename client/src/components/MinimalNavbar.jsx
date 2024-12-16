import React from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function MinimalNavbar() {
  return (
    <nav className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link to="/" className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Eventify
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
