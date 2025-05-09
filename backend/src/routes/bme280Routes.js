// Mätvärden från BME280

import express from "express";
import { getAllMeasurements } from "../utils/measurementsService.js";

const router = express.Router();

/**
 * @swagger
 * /bme280:
 *  get:
 *    summary: Mätningar från BME280.
 *    description: Route för att hämta alla mätningar från BME280.
 *    tags:
 *      - app
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: Antal mätningar att returnera (t.ex. ?limit=10)
 *    responses:
 *      200:
 *        description: Alla mätningar hämtade.
 */
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const measurements = await getAllMeasurements(limit);
    // Plocka ut endast id, timestamp, temperature, humidity och pressure
    const filtered = measurements.map(
      ({ id, timestamp, temperature, humidity, pressure }) => ({
        id,
        timestamp,
        temperature,
        humidity,
        pressure,
      })
    );
    res.json(filtered);
  } catch (err) {
    console.error("Fel vid läsning av alla mätningar:", err);
    res.status(500).json({
      error: "Kunde inte läsa mätdata",
      details: err.message,
    });
  }
});

export default router;
