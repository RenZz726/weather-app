import { Router } from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = Router();

router.post("/", (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({error: "Invalid JSON or empty body"})
  }

  getWeather(req, res, data)
})

export const handleWeather = router;

// weather data
// cureent weather
//historical data



// import { getWeather } from "../controllers/weatherController.js";

// export const handleWeather = (req, res) => {
//   let body = "";

//   req.on("data", chunk => body += chunk.toString());

//   req.on("end", () => {
//     try {
//       const data = JSON.parse(body);
//       getWeather(req, res, data);
//     } catch {
//       res.writeHead(400, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Invalid JSON" }));
//     }
//   });
// };
