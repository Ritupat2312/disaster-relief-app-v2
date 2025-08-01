// src/utils/disasterAI.js

// This function detects potential disasters based on real-time OpenWeatherMap data
// using realistic thresholds for extreme weather.
export const detectDisaster = (weatherData) => {
  const alerts = [];
  let disasterScore = 0;

  // --- Condition 1: Extreme Heat ---
  // A high heat warning is often issued when temperatures exceed 45°C.
  const temperature = weatherData?.main?.temp;
  if (temperature && temperature > 45) {
    alerts.push(`Extreme Heat Alert: Temperature is ${temperature}°C. This is a life-threatening heat event. Seek immediate shelter.`);
    disasterScore += 20;
  }

  // --- Condition 2: Hurricane-Force Winds ---
  // A hurricane is typically defined by sustained winds over 33 m/s (~119 km/h).
  const windSpeed = weatherData?.wind?.speed;
  if (windSpeed && windSpeed > 33) {
    alerts.push(`Hurricane-Force Winds Warning: Wind speed is ${windSpeed} m/s. Secure property and evacuate if necessary.`);
    disasterScore += 30;
  }
  // --- Condition 3: High Winds ---
  else if (windSpeed && windSpeed > 17.5) {
    alerts.push(`High Wind Warning: Wind speed is ${windSpeed} m/s. Secure loose objects and stay indoors.`);
    disasterScore += 10;
  }

  // --- Condition 4: Heavy Rain / Flash Flood ---
  // A flash flood is often defined as more than 50mm of rainfall in an hour.
  const rainVolume = weatherData?.rain?.["1h"];
  if (rainVolume && rainVolume > 50) {
    alerts.push(`Flash Flood Warning: Extreme rainfall of ${rainVolume}mm/hr detected. Move to higher ground immediately.`);
    disasterScore += 25;
  }

  // --- Condition 5: Specific Severe Weather ---
  const mainWeather = weatherData?.weather?.[0]?.main;
  if (mainWeather === "Thunderstorm" || mainWeather === "Tornado" || mainWeather === "Squall") {
      alerts.push(`Severe Weather Alert: ${mainWeather} detected. Seek immediate shelter.`);
      disasterScore += 20;
  }

  // --- Combined Condition: High Heat & High Winds ---
  if (temperature && temperature > 38 && windSpeed && windSpeed > 15) {
      alerts.push(`Extreme Fire Risk: Hot and very windy conditions detected. Avoid open flames and be prepared for evacuation.`);
      disasterScore += 15;
  }

  // Final check for a severe alert
  if (disasterScore > 25) {
      alerts.unshift("SEVERE DISASTER ALERT: Immediate Action Required.");
  }
  
  return alerts;
};