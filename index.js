import http from "http";
import { handleWeather } from "./routes/weather.js";
import { handleHistorical } from "./routes/historical.js";
import { handleCity } from "./routes/city.js";

const PORT = 5000;

const server = http.createServer((req, res) => {
  // ✅ Add CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" || req.method === "GET") {
    console.log("Helelo")
    if (req.url.startsWith("/weather")) return handleWeather(req, res);
    if (req.url.startsWith("/historical-weather")) return handleHistorical(req, res);
    if (req.url.startsWith("/city")) return handleCity(req, res);

    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Endpoint not found" }));
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
  }
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
