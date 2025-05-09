import express from "express";
import { createMeasurement } from "../utils/measurementsService.js";

const router = express.Router();

// Route för att ta emot data från hårdvaran
/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Ladda upp en uppsättning mätvärden från sensor.
 *     description: Den här endpointen tar emot sensorvärden och lagrar dem. Timestamp är valfri; om den saknas används serverns aktuella tid.
 *     tags:
 *       - sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: ISO 8601-tidsstämpel (valfri)
 *               temperature:
 *                 type: number
 *                 example: 22.5
 *               humidity:
 *                 type: number
 *                 example: 55.2
 *               pressure:
 *                 type: number
 *                 example: 101325
 *               aqi:
 *                 type: integer
 *                 example: 42
 *               tvoc:
 *                 type: number
 *                 example: 150
 *               eco2:
 *                 type: number
 *                 example: 400
 *           example:
 *             timestamp: "2025-05-09T14:30:00Z"
 *             temperature: 22.5
 *             humidity: 55.2
 *             pressure: 101325
 *             aqi: 42
 *             tvoc: 150
 *             eco2: 400
 *     responses:
 *       200:
 *         description: Nya mätvärden har lagrats.
 *         content:
 *           application/json:
 *             example:
 *               id: "abcd1234"
 *               timestamp: "2025-05-09T14:30:00Z"
 *               temperature: 22.5
 *               humidity: 55.2
 *               pressure: 101325
 *               aqi: 42
 *               tvoc: 150
 *               eco2: 400
 *       400:
 *         description: Fel i datan (t.ex. saknade eller ogiltiga fält).
 *         content:
 *           application/json:
 *             example:
 *               error: "Kunde inte spara mätdata"
 *               details: "null value in column \"pressure\" of relation \"measurements\" violates not-null constraint"
 */

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
