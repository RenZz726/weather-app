import { getCityCoordinates } from "../controllers/cityController.js";

export const handleCity = (req, res) => {
  const urlParts = req.url.split("/");
  const cityName = decodeURIComponent(urlParts[2] || "");
  console.log("city", cityName)
  if (!cityName) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "City name required" }));
  }

  getCityCoordinates(req, res, cityName);
};
