import http from "http";

const PORT = 5000;

const LAT = 51.5072;
const LON = -0.1276;
const server = http.createServer(async (req, res) => {
    if(req.method === "GET" && req.url === "/") {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&timezone=auto`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.writeHead(200, { "content-Type": "applications/json"});
        res.end(JSON.stringify(data.current_weather));
    } else {
        res.writeHead(404, {"content-Type": "text/plain"});
        res.end("Not found");
    }
});

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})