export const fetchWeather = async (lat, lon) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.current_weather;
};
