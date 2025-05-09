// Mätvärden från ENS160

import express from "express";
import { getAllMeasurements } from "../utils/measurementsService.js";

const router = express.Router();

/**
 * @swagger
 * /ens160:
 *  get:
 *    summary: Mätningar från ENS160.
 *    description: Route för att hämta alla mätningar från ENS160.
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
    // Plocka ut endast id, timestamp och luftkvalitetsvärden
    const filtered = measurements.map(({ id, timestamp, aqi, tvoc, eco2 }) => ({
      id,
      timestamp,
      aqi,
      tvoc,
      eco2,
    }));
    res.json(filtered);
  } catch (err) {
    console.error("Fel vid läsning av luftkvalitetsdata:", err);
    res.status(500).json({
      error: "Kunde inte läsa luftkvalitetsdata",
      details: err.message,
    });
  }
});

export default router;
