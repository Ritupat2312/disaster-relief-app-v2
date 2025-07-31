// File: src/pages/Home.jsx
import React from "react";
import WeatherWidget from '../components/WeatherWidget';

function Home() {
  return (
    <div>
      <h3 className="text-3xl font-bold text-blue-700 mb-4 text-left">Disaster Sense AI</h3>
      <p className="text-lg text-gray-700 mb-8 text-left">And info...</p>
      <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Welcome to Disaster Relief – Your Crisis Coordination Companion</h2>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Disaster Relief is a cutting-edge coordination platform designed to bridge people in distress with those eager to help—whether online or offline. Our goal is to enable seamless communication and aid delivery even when traditional networks fail.
      </p>
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Coordination & Aid
            </h3>
            <p className="text-gray-600">
              Our platform allows victims to quickly request help, and volunteers to efficiently offer assistance. Admins can manage requests, assign tasks, and broadcast emergency alerts, streamlining the entire relief effort.
            </p>
            <ul className="list-disc text-left ml-6 mt-4 text-gray-700 space-y-2">
              <li>Admin alerts and task assignments</li>
              <li>Location- and skill-based volunteer matching</li>
              <li>Real-time help request sync via Firebase</li>
              <li>Volunteer reputation tracking (beta)</li>
            </ul>
          </div>
        </div>
        <WeatherWidget /> 
        <div className="bg-indigo-50 p-6 rounded-lg shadow-inner border border-indigo-200 col-span-full md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Emergency Offline Connectivity
            </h3>
            <p className="text-gray-600 mb-4">
              Even during critical network outages, communication remains possible through our upcoming companion mobile app.
            </p>
            <ul className="list-disc text-left ml-6 text-gray-700 space-y-2">
              <li><strong>Offline Mobile Sync:</strong> Data exchange via Bluetooth/Wi-Fi Direct for local mesh networks (companion mobile app feature).</li>
              <li><strong>Offline-First Web (Upcoming):</strong> For this web app, leveraging service workers and IndexedDB for basic offline data access.</li>
            </ul>
          </div>
          <p className="text-sm italic text-gray-500 mt-4 text-center">
            (Note: Direct Bluetooth/Wi-Fi P2P communication is typically for native mobile apps.)
          </p>
        </div>
      </div>
      <p className="italic text-blue-600 text-2xl mt-12 font-semibold">“Relief is not just an action; it's a connection.”</p>
    </div>
  );
}

export default Home;