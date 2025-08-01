// src/components/WeatherWidget.jsx
import React, { useEffect, useState } from "react";
import { detectDisaster } from "../utils/disasterAI";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    if (!API_KEY) {
      setError("Weather API key is missing.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then(async (data) => {
            setWeather(data);

            // AI disaster detection
            const foundAlerts = detectDisaster(data);
            setAlerts(foundAlerts);

            // Save alerts to Firebase
            for (const alert of foundAlerts) {
              await addDoc(collection(db, "disasterAlerts"), {
                alert,
                location: `${latitude}, ${longitude}`,
                createdAt: Timestamp.now(),
              });
            }
          })
          .catch(() => setError("Failed to fetch weather data."));
      },
      () => {
        setError("Location permission denied.");
      }
    );
  }, []);

  if (error) {
    return <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>;
  }

  if (!weather) {
    return <p className="bg-gray-100 p-3 rounded">Loading weather...</p>;
  }

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold">{weather.name}</h2>
      <p className="text-gray-700 capitalize">
        {weather.weather[0].description}
      </p>
      <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</p>

      {alerts.length > 0 && (
        <div className="mt-4 bg-red-100 p-2 rounded">
          <h3 className="text-red-700 font-bold">⚠ Disaster Alerts</h3>
          <ul className="text-sm text-red-800 mt-1 space-y-1">
            {alerts.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
