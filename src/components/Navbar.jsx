// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src="/app_logo.png" alt="Disaster Relief Logo" className="h-10" />
        <h1 className="text-2xl font-bold text-blue-700">DisasterSenseAI</h1>
      </div>
      <nav className="flex space-x-6">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          Home
        </Link>
        <Link
          to="/request-help"
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          Request Help
        </Link>
        <Link
          to="/offer-help"
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          Offer Help
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
