// src/pages/Home.jsx
import React from "react";
import WeatherWidget from "../components/WeatherWidget";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl p-8 shadow-lg text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to DisasterSenseAI
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          AI-powered disaster sensing and relief coordination. Connecting those
          in need with volunteers, faster than ever.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/request-help"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition transform hover:scale-105"
          >
            Request Help
          </Link>
          <Link
            to="/offer-help"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition transform hover:scale-105"
          >
            Offer Help
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="mt-10 grid md:grid-cols-2 gap-6">
        {/* Coordination Card */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">
            Coordination & Aid
          </h2>
          <p className="text-gray-700">
            Quickly request help or offer assistance. Location-based volunteer
            matching for faster response.
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-600">
            <li>Admin alerts & task assignments</li>
            <li>Real-time help request sync</li>
            <li>Volunteer reputation tracking</li>
          </ul>
        </div>

        {/* Weather Widget */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <WeatherWidget />
        </div>
      </section>
    </div>
  );
}

export default Home;
