// File: src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl mt-8 border-t-4 border-purple-500">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Admin Dashboard</h2>
      <p className="text-lg text-gray-700 mb-6 text-center">
        This section is dedicated to administrators for efficient disaster management.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Request & Volunteer Management Card */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-200">
          <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Request & Volunteer Management
          </h3>
          <p className="text-gray-600">
            Gain a comprehensive overview of all help requests and available volunteers. Filter by type, location, and status. Assign tasks to volunteers and track their progress.
          </p>
          <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2">
            <li>View and filter all requests</li>
            <li>Assign volunteers to tasks</li>
            <li>Monitor volunteer status and capacity</li>
          </ul>
        </div>
        {/* AI-Powered Disaster Sensing & Alerts Card */}
        <div className="bg-red-50 p-6 rounded-lg shadow-inner border border-red-200">
          <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.395 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            AI-Powered Disaster Sensing (External Integration)
          </h3>
          <p className="text-gray-600 mb-4">
            Integrate with external AI services for early warning and real-time situational awareness.
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>**Satellite Imagery Analysis:** (API Integration) Detect floods, wildfires, and damage assessment.</li>
            <li>**Social Media & News NLP:** (API Integration) Identify emerging crises and distress signals from text data.</li>
            <li>**IoT Sensor Monitoring:** (API Integration) Track environmental anomalies (e.g., air quality, seismic activity).</li>
          </ul>
          <p className="text-sm italic text-gray-500 mt-4">
            (Note: Core AI models run on specialized backends; this dashboard would display their processed output.)
          </p>
        </div>
        {/* Emergency Broadcasting & Analytics Card */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-200">
          <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6 3 3 0 000 6zm-5.5 0P9 10 6 10c-3 0-3 1.5-3 4.5s2.5 4.5 5.5 4.5L14 14.5c0 0 0 9 0 9" />
            </svg>
            Emergency Broadcasting & Analytics
          </h3>
          <p className="text-gray-600">
            Send out critical alerts to all users or specific groups. Access analytics to identify patterns in requests, optimize resource allocation, and improve response times for future emergencies.
          </p>
          <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2">
            <li>Broadcast emergency alerts</li>
            <li>Real-time data insights and reports</li>
            <li>Performance tracking for relief operations</li>
          </ul>
        </div>
      </div>
      <p className="italic text-purple-600 text-xl mt-10 text-center">“Efficient management ensures timely relief.”</p>
    </div>
  );
};

export default Dashboard;