// server.js
import http from "http";

const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      let bodyData;
      try {
        bodyData = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }

      if (req.url === "/weather") {
        const { lat, lon } = bodyData;

        if (!lat || !lon) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "lat and lon required" }));
        }

        try {
          const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(data.current_weather));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Failed to fetch weather data" }));
        }
      }

      else if (req.url === "/historical-weather") {
        const { lat, lon, start, end } = bodyData;

        if (!lat || !lon || !start || !end) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ error: "lat, lon, start, end required" })
          );
        }

        try {
          const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(data.daily));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Failed to fetch historical data" }));
        }
      }

      else {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Endpoint not found" }));
      }
    });
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



// newyork
// {
//     "lat": 40.7128,
//     "lon": -74.0060
// }

// london
// {
//     "lat": 48.8566,
//     "lon": 2.3522
// }

// sulthan bathery
// {
//   "lat": 11.7195,
//   "lon": 76.3394
// }

// {
//   "lat": 51.5072,
//   "lon": -0.1276,
//   "start": "2023-09-01",
//   "end": "2023-09-05"
// }