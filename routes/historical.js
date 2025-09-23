import { getHistoricalWeather } from "../controllers/historicalController.js";

export const handleHistorical = (req, res) => {
  let body = "";

  req.on("data", chunk => body += chunk.toString());

  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      getHistoricalWeather(req, res, data);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
};
