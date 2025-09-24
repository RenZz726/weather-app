const container = document.getElementById("container");
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
    fetchWeather(data.lat, data.lon, city)
  } catch (err) {
    console.error("Error fetching coordinates:", err.message);
  }
}

function searchCityFromInput() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  searchCity(city);
}

async function fetchWeather(lat, lon, city) {
  const container = document.getElementById("container");
  container.style.display = "block"; 
  const response = await fetch("http://localhost:5000/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon })
  });
  const data = await response.json();
  const { time, temperature, windspeed, weathercode } = data;


  document.getElementById("cityName").textContent = city;
  document.getElementById("time").textContent = `Updated: ${time}`;
  document.querySelector(".temp").innerHTML = `${temperature}<sup>°</sup>C`;
  document.getElementById("condition").textContent = weatherConditions[weathercode] || "Unknown";
  document.getElementById("windspeed").textContent = `Wind: ${windspeed} km/h`;

  document.getElementById("historical").innerHTML = `
              <label for="start">Start date:</label>
              <input type="date" id="start" max="2025-09-23">

              <label for="end">End date:</label>
              <input type="date" id="end" max="2025-09-23">
              <button id="historical-btn">Custom range</button>
            `;
    const histBtn = document.getElementById("historical-btn");
    histBtn.onclick = () => {
    const startDate = document.getElementById("start").value;
    const endDate = document.getElementById("end").value;

    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    fetchHistoricalWeather(lat, lon, startDate, endDate);
  };
}

async function fetchHistoricalWeather(lat, lon, start, end) {
  const response = await fetch("http://localhost:5000/historical-weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lat, lon, start, end })
  });
  const data = await response.json();
  const { temperature_2m_max: max, temperature_2m_min: min, time: dates } = data;

  const historicalContainer = document.getElementById("historicalDataByDate");
  historicalContainer.innerHTML = ""; 

  for (let i = 0; i < dates.length; i++) {
    const dayCard = document.createElement("div");
    dayCard.className = "day-card";

    dayCard.innerHTML = `
      <h3 class="date">${dates[i]}</h3>
      <p class="temperature">Max: ${max[i]}°C | Min: ${min[i]}°C</p>
    `;

    historicalContainer.appendChild(dayCard);
  }
};



// temperature_2m_max
// : 
// (5) [29.6, 28.4, 24.4, 21, 27.3]
// temperature_2m_min
// : 
// (5) [16.9, 17.7, 17.3, 17.1, 18.1]
// time
// : 
// (5) ['2025-09-14', '2025-09-15', '2025-09-16', '2025-09-17', '2025-09-18']
// [[Prototype]]
// : 


// {
//   time: "2025-09-23T10:30",
//   interval: 900,
//   temperature: 22.9,
//   windspeed: 17,
//   winddirection: 212,
//   weathercode: 1,
//   is_day: 1
// }
