export const fetchCityCoordinates = async (cityName) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${cityName}&format=json&limit=1`);
  const data = await response.json();
  if (!data.length) return null;
  return { lat: data[0].lat, lon: data[0].lon };
};
