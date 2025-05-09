import express from "express";
import { getAllMeasurements } from "../utils/measurementsService.js";

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

export default router;
