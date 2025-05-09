import express from "express";
import { getAllMeasurements, createMeasurement } from "../utils/measurementsService.js";

const router = express.Router();

// Route för att hämta alla värden från båda sensorerna
/**
 * @swagger
 * /measurements:
 *  get:
 *    summary: Route för att hämta alla värden från båda sensorerna
 *    tags:
 *      - app
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: Antal mätningar att returnera
 *    responses:
 *      200:
 *        description: Alla mätningar.
 */
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

/**
 * @swagger
 * /measurements/{types}:
 *  get:
 *    summary: Hämta specifika typer av mätningar
 *    tags:
 *      - app
 *    parameters:
 *      - in: path
 *        name: types
 *        required: true
 *        schema:
 *          type: string
 *        description: Kommaseparerade typer av mätningar (t.ex. temperature,humidity,aqi)
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: Antal mätningar att returnera
 *    responses:
 *      200:
 *        description: Filtrerade mätningar
 *      400:
 *        description: Ogiltig typ av mätning
 */
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
