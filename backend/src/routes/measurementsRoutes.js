// Mätvärden från BME280

import express from "express";
import { loadMockData } from "../utils/dataLoader.js";
import { formatMeasurement } from "../utils/formatters.js";
import { findById } from "../utils/findById.js";

const router = express.Router();

// Route för att hämta alla mätningar
router.get("/", async (req, res) => {
  try {
    const data = await loadMockData();
    const measurements = formatMeasurement("measurements", data);
    res.json(measurements);
  } catch (err) {
    console.error("Fel vid läsning av alla mätningar:", err);
    res.status(500).json({
      error: "Kunde inte läsa mätdata",
      details: err.message,
    });
  }
});

// Route för att hämta temperaturvärden
router.get("/temperature", async (req, res) => {
  try {
    const data = await loadMockData();
    const temperatures = formatMeasurement("temperature", data);
    res.json(temperatures);
  } catch (err) {
    console.error("Fel vid läsning av temperaturdata:", err);
    res.status(500).json({
      error: "Kunde inte läsa temperaturvärden",
      details: err.message,
    });
  }
});

// Route för att hämta luftfuktighetsvärden
router.get("/humidity", async (req, res) => {
  try {
    const data = await loadMockData();
    const humidities = formatMeasurement("humidity", data);
    res.json(humidities);
  } catch (err) {
    console.error("Fel vid läsning av luftfuktighetsdata:", err);
    res.status(500).json({
      error: "Kunde inte läsa luftfuktighetsvärden",
      details: err.message,
    });
  }
});

// Route för att hämta tryckvärden
router.get("/pressure", async (req, res) => {
  try {
    const data = await loadMockData();
    const pressures = formatMeasurement("pressure", data);
    res.json(pressures);
  } catch (err) {
    console.error("Fel vid läsning av tryckdata:", err);
    res.status(500).json({
      error: "Kunde inte läsa tryckvärden",
      details: err.message,
    });
  }
});

// Hämta hela dataposten för ett visst ID (t.ex. /measurements/3)
router.get("/:id", findById, (req, res) => {
  const { id, timestamp, temperature, humidity, pressure } = req.measurement;

  res.json({
    id,
    timestamp,
    temperature,
    humidity,
    pressure,
  });
});

// Hämta ett specifikt värde (t.ex. /measurements/temperature/3)
router.get("/:type/:id", findById, (req, res) => {
  const { type } = req.params;
  const validTypes = ["temperature", "humidity", "pressure"];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: `Ogiltig typ: ${type}` });
  }

  res.json({
    id: req.measurement.id,
    timestamp: req.measurement.timestamp,
    [type]: req.measurement[type],
  });
});

export default router;
