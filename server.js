// import http from "http";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());

  app.use("/", routes);


  app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found"});
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "error occured" });
  });

  app.listen(PORT, () => {
    console.log("Server running at port 5000")
  });
