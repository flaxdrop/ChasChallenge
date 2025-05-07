import express from "express";
import { createMeasurement } from "../utils/measurementsService.js";

const router = express.Router();

// Route för att ta emot data från hårdvaran
router.post("/", async (req, res) => {
  const measurement = req.body;
  try {
    // Lägg till tidsstämpel om den inte finns
    if (!measurement.timestamp) {
      measurement.timestamp = new Date().toISOString();
    }

    const newMeasurement = await createMeasurement(measurement);
    res.status(201).json(newMeasurement); // Skicka tillbaka den skapade mätningen
  } catch (err) {
    console.error("Fel vid insättning av mätning:", err);
    res.status(500).json({
      error: "Kunde inte spara mätdata",
      details: err.message,
    });
  }
});

export default router;
