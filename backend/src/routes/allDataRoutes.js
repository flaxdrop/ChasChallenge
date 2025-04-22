import express from "express";
import { loadMockData } from "../utils/dataLoader.js";
import { formatMeasurement } from "../utils/formatters.js";
import { findById } from "../utils/findById.js";

const router = express.Router();

// Route för att hämta alla värden från båda sensorerna
router.get("/", async (req, res) => {
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

// Hämta all sensordata för ett specifikt ID
router.get("/:id", findById, (req, res) => {
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
