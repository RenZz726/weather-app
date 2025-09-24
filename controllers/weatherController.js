import { fetchWeather } from "../services/weatherService.js";

export const getWeather = async (req, res, bodyData) => {
  const { lat, lon } = bodyData;

  if (!lat || !lon) {
    return res.json({ error: "lat and lon required"})

    // res.writeHead(400, { "Content-Type": "application/json" });
    // return res.end(JSON.stringify({ error: "lat and lon required" }));
  }

  try {
    const weather = await fetchWeather(lat, lon);
    return res.json(weather);
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(weather));
  } catch {
    return res.json({ error: "Failed to fetch weather data"})
    // res.writeHead(500, { "Content-Type": "application/json" });
    // res.end(JSON.stringify({ error: "Failed to fetch weather data" }));
  }
};
