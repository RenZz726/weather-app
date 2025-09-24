import { Router } from "express";
import { getCityCoordinates } from "../controllers/cityController.js";

const router = Router();

router.get("/:name", (req, res) => {
  const cityName = req.params.name;
  if (!cityName) {
    return res.status(400).json({ error: "City name required"})
  }

  getCityCoordinates(req, res, cityName);
})

export const handleCity = router;




// import { getCityCoordinates } from "../controllers/cityController.js";

// export const handleCity = (req, res) => {
  // const urlParts = req.url.split("/");
  // const cityName = decodeURIComponent(urlParts[2] || "");
  // console.log("city", cityName)
//   if (!cityName) {
//     res.writeHead(400, { "Content-Type": "application/json" });
//     return res.end(JSON.stringify({ error: "City name required" }));
//   }

//   getCityCoordinates(req, res, cityName);
// };