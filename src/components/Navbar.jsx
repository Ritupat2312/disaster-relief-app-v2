// File: src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Row: Dark Header with Logo and Main Title */}
      <div className="bg-gray-800 text-white p-4 md:px-8 flex items-center justify-between">
        {/* Left Section: Logo and Title */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src="/app_logo.png" alt="Disaster Sense AI Logo" className="h-10 w-10 object-contain rounded-full" /> 
          </Link>
          <span className="text-xl md:text-2xl font-extrabold tracking-wide">
            Disaster Sense AI - Early Detection & Relief Coordination
          </span>
        </div>
        {/* Right Section: Empty as per sketch's dark bar */}
        <div></div>
      </div>
      {/* Bottom Row: Navigation Links */}
      <div className="p-3 md:px-8 bg-gray-50 flex space-x-6 border-b-2 border-blue-100 overflow-x-auto">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-100 whitespace-nowrap">Home</Link>
        <Link to="/request-help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-100 whitespace-nowrap">Request Help</Link>
        <Link to="/offer-help" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-100 whitespace-nowrap">Offer Help</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 px-3 rounded-md hover:bg-blue-100 whitespace-nowrap">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;