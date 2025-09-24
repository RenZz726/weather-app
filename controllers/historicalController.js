import { fetchHistoricalWeather } from "../services/historicalService.js";

export const getHistoricalWeather = async (req, res, bodyData) => {
  const { lat, lon, start, end } = bodyData;

  if (!lat || !lon || !start || !end) {
    return res.json({ error: "lat, lon, start, end required" });
  }

  try {
    const data = await fetchHistoricalWeather(lat, lon, start, end);
    res.json(data);
  } catch {
    res.json({ error: "Failed to fetch historical data" });
  }
};



// import { fetchHistoricalWeather } from "../services/historicalService.js";

// export const getHistoricalWeather = async (req, res, bodyData) => {
//   const { lat, lon, start, end } = bodyData;

//   if (!lat || !lon || !start || !end) {
//     res.writeHead(400, { "Content-Type": "application/json" });
//     return res.end(JSON.stringify({ error: "lat, lon, start, end required" }));
//   }

//   try {
//     const data = await fetchHistoricalWeather(lat, lon, start, end);
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(data));
//   } catch {
//     res.writeHead(500, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Failed to fetch historical data" }));
//   }
// };
