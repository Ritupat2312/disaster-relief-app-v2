// This function detects potential disasters based on OpenWeatherMap data.
// You can add more complex logic here as needed.

export const detectDisaster = (weatherData) => {
  const alerts = [];

  // Check for extreme heat using the OpenWeatherMap data structure
  const temperature = weatherData?.main?.temp;
  if (temperature && temperature > 35) {
    alerts.push(`Heatwave Alert: Temperature is ${temperature}°C.`);
  }

  // Check for strong winds using the OpenWeatherMap data structure
  const windSpeed = weatherData?.wind?.speed;
  if (windSpeed && windSpeed > 13.8) { // 13.8 m/s is roughly 50 km/h
    alerts.push(`High Wind Warning: Wind speed is ${windSpeed} m/s.`);
  }

  // Add more conditions here, such as:
  // - High humidity for potential flooding (weatherData.main.humidity)
  // - Specific weather conditions (e.g., 'Thunderstorm', 'Tornado') from weatherData.weather[0].main

  return alerts;
};