// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Modern navbar
import Home from "./pages/Home";
import RequestHelp from "./pages/RequestHelp";
import OfferHelp from "./pages/OfferHelp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
        {/* Navbar on every page */}
        <Navbar />

        {/* Main Page Content */}
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

