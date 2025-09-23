const container = document.getElementById("container");
console.log(container);
const weatherConditions = {
  0: "Clear ☀️",
  1: "Mainly clear 🌤️",
  2: "Partly cloudy ⛅",
  3: "Overcast ☁️",
  45: "Fog 🌫️",
  51: "Light rain 🌦️",
  61: "Rain 🌧️",
  63: "Moderate rain 🌧️",
  65: "Heavy rain 🌧️",
  71: "Light snow ❄️",
  73: "Snow ❄️",
  75: "Heavy snow ❄️",
  80: "Rain showers 🌦️",
  81: "Moderate rain showers 🌧️",
  82: "Heavy rain showers ⛈️"
};

async function searchCity(city) {
  try {
    const response = await fetch(`http://localhost:5000/city/${encodeURIComponent(city)}`);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    console.log("Coordinates for", city, ":", data);
    fetchWeather(data.lat, data.lon, city)
  } catch (err) {
    console.error("Error fetching coordinates:", err.message);
  }
}

// New wrapper to read input value
function searchCityFromInput() {
  const city = document.getElementById("cityInput").value.trim();
  console.log(encodeURIComponent(city));
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  searchCity(city);
}

async function fetchWeather(lat, lon, city) {
  const response = await fetch("http://localhost:5000/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon })
  });
  const data = await response.json();
  const { time, temperature, windspeed, weathercode } = data;

  console.log("Weather from backend:", data, time, weatherConditions[weathercode]);

  document.getElementById("cityName").textContent = city;
  document.getElementById("time").textContent = `Updated: ${time}`;
  document.querySelector(".temp").innerHTML = `${temperature}<sup>°</sup>C`;
  document.getElementById("condition").textContent = weatherConditions[weathercode] || "Unknown";
  document.getElementById("windspeed").textContent = `Wind: ${windspeed} km/h`;
}


// {
//   time: "2025-09-23T10:30",
//   interval: 900,
//   temperature: 22.9,
//   windspeed: 17,
//   winddirection: 212,
//   weathercode: 1,
//   is_day: 1
// }
