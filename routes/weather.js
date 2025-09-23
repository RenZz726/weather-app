import { getWeather } from "../controllers/weatherController.js";

export const handleWeather = (req, res) => {
  let body = "";

  req.on("data", chunk => body += chunk.toString());

  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      getWeather(req, res, data);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
};
