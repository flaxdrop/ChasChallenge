import express from "express";
import measurementsRoutes from "./measurementsRoutes.js";
import airQualityRoutes from "./airQualityRoutes.js";
import { loadMockData } from "../utils/dataLoader.js";
import { formatMeasurement } from "../utils/formatters.js";
import { findById } from "../utils/findById.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Välkommen till SyntaxSquad's API!");
});

// Route för att hämta alla värden från båda sensorerna
router.get("/all", async (req, res) => {
  try {
    const data = await loadMockData();
    const allValues = formatMeasurement("all", data);
    res.json(allValues);
  } catch (err) {
    console.error("Fel vid läsning av alla sensorvärden:", err);
    res.status(500).json({
      error: "Kunde inte läsa sensordata",
      details: err.message,
    });
  }
});

// Routes för de två olika sensorerna
router.use("/measurements", measurementsRoutes);
router.use("/airquality", airQualityRoutes);

// Hämta all sensordata för ett specifikt ID
router.get("/all/:id", findById, (req, res) => {
  const m = req.measurement;

  if (!m || !m.airQuality) {
    return res
      .status(404)
      .json({ error: "Datapost saknas eller ofullständig" });
  }

  res.json({
    id: m.id,
    timestamp: m.timestamp,
    temperature: m.temperature,
    humidity: m.humidity,
    pressure: m.pressure,
    aqi: m.airQuality.aqi,
    tvoc: m.airQuality.tvoc,
    eco2: m.airQuality.eco2,
  });
});

export default router;
