import { Router } from "express";
import { handleWeather } from "./weather.js";
import { handleHistorical } from "./historical.js";
import { handleCity } from "./city.js";
import { handleAuth } from "./authentication.js";

const router = Router();

  router.use("/weather", handleWeather);
  router.use("/historical-weather", handleHistorical);
  router.use("/city", handleCity);
  router.use("/auth", handleAuth); 

export default router;