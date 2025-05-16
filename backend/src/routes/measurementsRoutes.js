import express from "express";
import {
  getAllMeasurements,
  createMeasurement,
  removeMeasurements,
} from "../utils/measurementsService.js";

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
    "pm1_0",
    "pm2_5",
    "pm4_0",
    "pm10_0",
    "nc0_5",
    "nc1_0",
    "nc2_5",
    "nc4_0",
    "nc10_0",
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
router.post("/remove", async (req, res) => {
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

    const deletedCount = await removeMeasurements(start, end);

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

export default router;
