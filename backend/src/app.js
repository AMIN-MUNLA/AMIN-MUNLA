const cors = require("cors");
const express = require("express");

const errorHandler = require("./middleware/errorHandler");
const apiRouter = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    project: "Senior Companion Check-In Planner",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `No route found for ${req.method} ${req.originalUrl}`,
    details: null,
  });
});

app.use(errorHandler);

module.exports = app;
