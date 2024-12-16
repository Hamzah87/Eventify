import React from "react";
import { CalendarCheck, Users, ChartBar } from "lucide-react";
import { SearchCard } from "./components/SearchCard";
import { FeatureCard } from "./components/FeatureCard";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Ultimate Event Planning Solution
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover, create, and manage extraordinary events that bring
              people together. Your next memorable experience starts here.
            </p>
            <Link
              to="/events"
              className="inline-block bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
            >
              Explore Eventify
            </Link>
          </div>

          <div className="max-w-6xl mx-auto px-4 relative z-10 translate-y-16">
            <SearchCard />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Why Choose Eventify?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={CalendarCheck}
            title="Easy Scheduling"
            description="Intuitive calendar management and scheduling tools"
          />
          <FeatureCard
            icon={Users}
            title="Attendee Management"
            description="Effortlessly manage registrations and attendees"
          />
          <FeatureCard
            icon={ChartBar}
            title="Analytics & Insights"
            description="Powerful analytics to track engagement and optimize your events"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
