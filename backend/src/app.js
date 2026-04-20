const cors = require("cors");
const express = require("express");

const apiRouter = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    project: "GoldenCare Senior Check-In",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `No route found for ${req.method} ${req.originalUrl}`,
  });
});

module.exports = app;
