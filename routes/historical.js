import { Router } from "express";
import { getHistoricalWeather } from "../controllers/historicalController.js";

const router = Router();

router.post("/", (req, res) => {
  const data = req.body;

  if (!data) {
    return res.json({error: "Invalid JSON"});
  }

  getHistoricalWeather(req, res, data);
})

export const handleHistorical = router;




// import { getHistoricalWeather } from "../controllers/historicalController.js";

// export const handleHistorical = (req, res) => {
//   let body = "";

//   req.on("data", chunk => body += chunk.toString());

//   req.on("end", () => {
//     try {
//       const data = JSON.parse(body);
//       getHistoricalWeather(req, res, data);
//     } catch {
//       res.writeHead(400, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Invalid JSON" }));
//     }
//   });
// };
