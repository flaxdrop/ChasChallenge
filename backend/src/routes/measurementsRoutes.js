import express from "express";
import {
  getAllMeasurements,
  createMeasurement,
  deleteMeasurements,
} from "../utils/measurementsService.js";
import authenticateJWT from "../middleware/auth/authenticateJWT.js";
import { authorizeAdmin } from "../middleware/auth/authorizeRole.js";

const router = express.Router();

// Route för att hämta alla värden från båda sensorerna
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const allMeasurements = await getAllMeasurements(limit);
    res.json(allMeasurements);
  } catch (err) {
    console.error("Fel vid läsning av alla sensorvärden:", err);
    res.status(500).json({
      error: "Kunde inte läsa sensordata",
      details: err.message,
    });
  }
});

// Route för att hämta specifika typer av mätningar
router.get("/:types", async (req, res) => {
  const { types } = req.params;
  // Lista över giltiga mätningstyper
  const validTypes = [
    "temperature",
    "humidity",
    "pressure",
    "aqi",
    "tvoc",
    "eco2",
    "pm1",
    "pm2_5",
    "pm4",
    "pm10",
    "nc_0_5",
    "nc_1_0",
    "nc_2_5",
    "nc_4_0",
    "nc_10_0",
    "typical_particle_size",
  ];

  // Dela upp types-strängen i en array och validera varje typ
  const requestedTypes = types.split(",");
  const invalidTypes = requestedTypes.filter(
    (type) => !validTypes.includes(type)
  );

  if (invalidTypes.length > 0) {
    return res.status(400).json({
      error: "Ogiltiga typer av mätningar",
      invalidTypes,
    });
  }

  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const measurements = await getAllMeasurements(limit);

    // Filtrera mätningarna för att endast inkludera efterfrågade typer
    const filtered = measurements.map((m) => {
      const filteredMeasurement = {
        id: m.id,
        timestamp: m.timestamp,
      };

      requestedTypes.forEach((type) => {
        if (m[type] !== undefined) {
          filteredMeasurement[type] = m[type];
        }
      });

      return filteredMeasurement;
    });

    res.json(filtered);
  } catch (err) {
    console.error("Fel vid läsning av filtrerade sensorvärden:", err);
    res.status(500).json({
      error: "Kunde inte läsa filtrerad sensordata",
      details: err.message,
    });
  }
});

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

// Route för att ta bort mätningar baserat på tidsintervall
//* ADMIN ONLY
router.post("/delete", authenticateJWT, authorizeAdmin, async (req, res) => {
  const { startTime, endTime } = req.body;

  // Validera tidsintervall
  if (!startTime || !endTime) {
    return res.status(400).json({
      error: "Både startTime och endTime måste anges",
    });
  }

  try {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        error:
          "Ogiltigt datumformat. Använd ISO 8601 (t.ex. 2023-01-01T00:00:00Z)",
      });
    }

    if (start > end) {
      return res.status(400).json({
        error: "startTime måste vara tidigare än endTime",
      });
    }

    const deletedCount = await deleteMeasurements(start, end);

    res.json({
      deletedCount,
      message: `Mätningar mellan ${startTime} och ${endTime} har tagits bort`,
    });
  } catch (err) {
    console.error("Fel vid borttagning av mätningar:", err);
    res.status(500).json({
      error: "Kunde inte ta bort mätningar",
      details: err.message,
    });
  }
});


/**
 * @swagger
 * /measurements:
 *   get:
 *     summary: Route för att hämta alla värden från båda sensorerna
 *     tags: [public]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Antal mätningar att returnera
 *     responses:
 *       200:
 *         description: Alla mätningar.
 *       500:
 *         description: Fel vid läsning av alla sensorvärden
 */

/**
 * @swagger
 * /measurements/{types}:
 *   get:
 *     summary: Hämta specifika typer av mätningar
 *     tags: [public]
 *     parameters:
 *       - in: path
 *         name: types
 *         required: true
 *         schema:
 *           type: string
 *         description: Kommaseparerade typer av mätningar
 *         example: temperature,humidity,aqi
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Antal mätningar att returnera
 *         example: 10
 *     responses:
 *       200:
 *         description: Filtrerade mätningar
 *       400:
 *         description: Ogiltig typ av mätning
 */

/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Ladda upp en uppsättning mätvärden från sensor.
 *     tags: [sensor]
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
 *                 example: 4
 *               tvoc:
 *                 type: number
 *                 example: 150
 *               eco2:
 *                 type: number
 *                 example: 400
 *               pm1:
 *                 type: number
 *                 example: 10.5
 *               pm2_5:
 *                 type: number
 *                 example: 20.3
 *               pm4:
 *                 type: number
 *                 example: 35.1
 *               pm10:
 *                 type: number
 *                 example: 50.7
 *               nc_0_5:
 *                 type: number
 *                 example: 100.2
 *               nc_1_0:
 *                 type: number
 *                 example: 150.8
 *               nc_2_5:
 *                 type: number
 *                 example: 220.4
 *               nc_4_0:
 *                 type: number
 *                 example: 300.9
 *               nc_10_0:
 *                 type: number
 *                 example: 450.6
 *               typical_particle_size:
 *                 type: number
 *                 example: 5.0
 *     responses:
 *       200:
 *         description: Nya mätvärden har lagrats.
 *       400:
 *         description: Fel i datan (t.ex. saknade eller ogiltiga fält).
 */

/**
 * @swagger
 * /measurements/delete:
 *   post:
 *     summary: Ta bort mätningar baserat på tidsintervall
 *     tags: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Starttid för intervallet (ISO 8601)
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: Sluttid för intervallet (ISO 8601)
 *     responses:
 *       200:
 *         description: Mätningar har tagits bort
 *       400:
 *         description: Ogiltigt tidsintervall
 *       500:
 *         description: Serverfel vid borttagning
 */


export default router;
