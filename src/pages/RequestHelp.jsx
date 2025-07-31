// File: src/pages/RequestHelp.jsx
import React, { useState } from "react";
import { db } from "../utils/firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";

function RequestHelp() {
  const [form, setForm] = useState({ name: '', type: 'Medical', location: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null); 
    try {
      await addDoc(collection(db, "help_requests"), {
        ...form,
        createdAt: Timestamp.now(),
        status: 'pending' 
      });
      setSubmitted(true);
      setForm({ name: '', type: 'Medical', location: '', message: '' }); 
    } catch (err) {
      console.error("Error submitting help request:", err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-8 border-t-4 border-indigo-500">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Request Help</h2>
      {submitted ? (
        <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <p className="text-green-700 font-semibold text-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help request submitted successfully!
          </p>
          <p className="text-gray-600 mb-4">We've received your request and will connect you with aid as quickly as possible.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold transition duration-300 shadow-md"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Jane Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2">Type of Help Needed:</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <option>Medical</option>
              <option>Food</option>
              <option>Shelter</option>
              <option>Rescue</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-semibold mb-2">Your Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Block A, Sector 7, City, State"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Describe the Situation:</label>
            <textarea
              id="message"
              name="message"
              placeholder="e.g., We need urgent medical attention for 3 people..."
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              required
            ></textarea>
          </div>
          {error && <p className="text-red-600 text-center font-medium p-2 bg-red-50 border border-red-200 rounded">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-lg transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              'Submit Request'
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default RequestHelp;