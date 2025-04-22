// Mätvärden från ENS160

import express from "express";
import { loadMockData } from "../utils/dataLoader.js";
import { formatMeasurement } from "../utils/formatters.js";
import { findById } from "../utils/findById.js";

const router = express.Router();

// Route för att hämta alla luftkvalitetsvärden
router.get("/", async (req, res) => {
  try {
    const data = await loadMockData();
    const airQualityValues = formatMeasurement("airquality", data);
    res.json(airQualityValues);
  } catch (err) {
    console.error("Fel vid läsning av luftkvalitetsdata:", err);
    res.status(500).json({
      error: "Kunde inte läsa luftkvalitetsdata",
      details: err.message,
    });
  }
});

// Route för att hämta AQI (Air Quality Index)
router.get("/aqi", async (req, res) => {
  try {
    const data = await loadMockData();
    const aqiValues = formatMeasurement("aqi", data);
    res.json(aqiValues);
  } catch (err) {
    console.error("Fel vid läsning av AQI-data:", err);
    res.status(500).json({
      error: "Kunde inte läsa AQI-värden",
      details: err.message,
    });
  }
});

// Route för att hämta TVOC (Total Volatile Organic Compounds)
router.get("/tvoc", async (req, res) => {
  try {
    const data = await loadMockData();
    const tvocValues = formatMeasurement("tvoc", data);
    res.json(tvocValues);
  } catch (err) {
    console.error("Fel vid läsning av TVOC-data:", err);
    res.status(500).json({
      error: "Kunde inte läsa TVOC-värden",
      details: err.message,
    });
  }
});

// Route för att hämta eCO2 (equivalent CO2)
router.get("/eco2", async (req, res) => {
  try {
    const data = await loadMockData();
    const eco2Values = formatMeasurement("eco2", data);
    res.json(eco2Values);
  } catch (err) {
    console.error("Fel vid läsning av eCO2-data:", err);
    res.status(500).json({
      error: "Kunde inte läsa eCO2-värden",
      details: err.message,
    });
  }
});

// Hämta hela air quality-posten för ett visst ID (t.ex. /airquality/3)
router.get("/:id", findById, (req, res) => {
  const { id, timestamp, airQuality } = req.measurement;

  if (!airQuality) {
    return res
      .status(404)
      .json({ error: `Ingen air quality-data för ID ${id}` });
  }

  res.json({
    id,
    timestamp,
    aqi: airQuality.aqi,
    tvoc: airQuality.tvoc,
    eco2: airQuality.eco2,
  });
});

// Hämta ett specifikt AQ-värde (t.ex. /airquality/aqi/4)
router.get("/:type/:id", findById, (req, res) => {
  const { type } = req.params;
  const validTypes = ["aqi", "tvoc", "eco2"];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: `Ogiltig AQ-typ: ${type}` });
  }

  const value = req.measurement.airQuality?.[type];
  res.json({
    id: req.measurement.id,
    timestamp: req.measurement.timestamp,
    [type]: value,
  });
});

export default router;
