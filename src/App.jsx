// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RequestHelp from "./pages/RequestHelp";
import OfferHelp from "./pages/OfferHelp";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
        <Navbar />
        <main className="container mx-auto p-4 md:p-8">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 min-h-[calc(100vh-160px)] border border-gray-200">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/request-help" element={<RequestHelp />} />
              <Route path="/offer-help" element={<OfferHelp />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;