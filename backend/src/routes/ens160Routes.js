// Mätvärden från ENS160

import express from "express";
import { getAllMeasurements } from "../utils/measurementsService.js";

const router = express.Router();

/**
 * @swagger
 * /ens160:
 *  get:
 *    summary: Route för att hämta alla luftkvalitetsvärden
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
 *        description: Alla mätningar.
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

// Hämta alla värden av en viss typ (t.ex. /ens160/aqi)
/**
 * @swagger
 * /ens160/{type}:
 *  get:
 *    summary: Hämta alla värden av en viss typ
 *    tags:
 *      - app
 *    parameters:
 *      - in: path
 *        name: type
 *        required: true
 *        schema:
 *          type: string
 *        description: Typ av mätning (aqi, tvoc, eco2)
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: Antal mätningar att returnera (t.ex. ?limit=10)
 *    responses:
 *      200:
 *        description: Mätningar av vald typ
 */
router.get("/:type", async (req, res) => {
  const { type } = req.params;
  const validTypes = ["aqi", "tvoc", "eco2"];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: `Ogiltig typ: ${type}` });
  }

  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const measurements = await getAllMeasurements(limit);
    const filtered = measurements.map((m) => ({
      id: m.id,
      timestamp: m.timestamp,
      [type]: m[type],
    }));
    res.json(filtered);
  } catch (err) {
    console.error("Fel vid läsning av mätdata:", err);
    res.status(500).json({
      error: "Kunde inte läsa mätdata",
      details: err.message,
    });
  }
});

export default router;
