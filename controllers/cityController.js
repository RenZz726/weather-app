import { fetchCityCoordinates } from "../services/cityService.js";

export const getCityCoordinates = async (req, res, cityName) => {
  try {
    const coords = await fetchCityCoordinates(cityName);
    if (!coords) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "City not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(coords));
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to fetch city coordinates" }));
  }
};
