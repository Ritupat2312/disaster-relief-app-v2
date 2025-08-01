// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RequestHelp from "./pages/RequestHelp";
import OfferHelp from "./pages/OfferHelp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800">

        {/* Navbar */}
        <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">DisasterSenseAI</h1>
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/request-help" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Request Help
            </Link>
            <Link to="/offer-help" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Offer Help
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className="container mx-auto p-6 md:p-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request-help" element={<RequestHelp />} />
            <Route path="/offer-help" element={<OfferHelp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
