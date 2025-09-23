export const fetchHistoricalWeather = async (lat, lon, start, end) => {
  const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.daily;
};
