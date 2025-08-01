// src/pages/RequestHelp.jsx
import React, { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const RequestHelp = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    type: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const detectLocation = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          location: `${latitude}, ${longitude}`,
        }));
        setGpsLoading(false);
      },
      () => {
        alert("Location access denied.");
        setGpsLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "helpRequests"), {
        ...formData,
        status: "pending",
        createdAt: Timestamp.now(),
      });
      setSuccess("✅ Help request submitted successfully.");
      setFormData({ name: "", contact: "", type: "", location: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ Failed to submit request.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 border-t-4 border-blue-500">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">Request Help</h2>
      {success && <p className="bg-green-100 text-green-700 p-2 rounded mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          required
        />
        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Select Type of Help</option>
          <option value="Medical">Medical</option>
          <option value="Rescue">Rescue</option>
          <option value="Food">Food</option>
          <option value="Shelter">Shelter</option>
        </select>
        <textarea
          name="message"
          placeholder="Additional details about your situation..."
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          rows="3"
          required
        ></textarea>

        <div className="flex gap-2">
          <input
            type="text"
            name="location"
            placeholder="Location (Lat, Long)"
            value={formData.location}
            onChange={handleChange}
            className="flex-1 p-3 border rounded focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="button"
            onClick={detectLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={gpsLoading}
          >
            {gpsLoading ? "..." : "📍"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestHelp;
