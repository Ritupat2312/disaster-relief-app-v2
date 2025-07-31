// File: src/components/WeatherWidget.jsx
import React, { useState, useEffect } from "react";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // <-- PASTE YOUR KEY HERE
  const CITY = "Mumbai"; 
  const COUNTRY_CODE = "IN"; 

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Weather API Error: ${errorData.message || response.statusText}`);
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError(`Failed to load weather data: ${err.message}. Please check your API key.`);
      } finally {
        setLoading(false);
      }
    };
    if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
        setError("Please replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key in WeatherWidget.jsx");
        setLoading(false);
        return;
    }
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); 
    return () => clearInterval(interval); 
  }, [API_KEY, CITY, COUNTRY_CODE]); 

  if (loading) {
    return (
      <div className="p-4 text-center text-blue-600">
        <svg className="animate-spin h-6 w-6 text-blue-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 font-bold bg-red-100 border border-red-300 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return null; 
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md border border-blue-200 text-left flex flex-col justify-between h-full">
      <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.391 9.614A9.954 9.954 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.1-.657 4.05-1.764 5.676M19 12h3" />
        </svg>
        Current Weather in {weatherData.name}
      </h3>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img src={iconUrl} alt={weatherData.weather[0].description} className="w-16 h-16 mr-2" />
          <p className="text-4xl font-semibold text-blue-700">{Math.round(weatherData.main.temp)}°C</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-800 capitalize">{weatherData.weather[0].description}</p>
          <p className="text-gray-700 text-sm">Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
        </div>
      </div>
      <div className="text-gray-700 text-sm grid grid-cols-2 gap-2">
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>Visibility: {weatherData.visibility / 1000} km</p>
      </div>
    </div>
  );
};
export default WeatherWidget;