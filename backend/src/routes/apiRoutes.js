import express from "express";
import measurementsRoutes from "./measurementsRoutes.js";
import airQualityRoutes from "./airQualityRoutes.js";
import { loadMockData } from "../utils/dataLoader.js";
import { formatMeasurement } from "../utils/formatters.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Välkommen till SyntaxSquad's API!");
});

// Route för att hämta alla värden från båda sensorerna
router.get("/all", async (req, res) => {
  try {
    const data = await loadMockData();
    const allValues = formatMeasurement("all", data);
    res.json(allValues);
  } catch (err) {
    console.error("Fel vid läsning av alla sensorvärden:", err);
    res.status(500).json({
      error: "Kunde inte läsa sensordata",
      details: err.message,
    });
  }
});

// Routes för de två olika sensorerna
router.use("/measurements", measurementsRoutes);
router.use("/airquality", airQualityRoutes);

export default router;
