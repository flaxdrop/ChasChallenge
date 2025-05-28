import express from "express";
import {
  getAllMeasurements,
  createMeasurement,
  deleteMeasurements,
} from "../utils/measurementsService.js";
import authenticateJWT from "../middleware/auth/authenticateJWT.js";
import { authorizeAdmin } from "../middleware/auth/authorizeRole.js";

const router = express.Router();

// Route to fetch all values from both sensors
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const allMeasurements = await getAllMeasurements(limit);
    res.json(allMeasurements);
  } catch (err) {
    console.error("Error reading all sensor values:", err);
    res.status(500).json({
      error: "Could not read sensor data",
      details: err.message,
    });
  }
});

// Route to fetch specific types of measurements
router.get("/:types", async (req, res) => {
  const { types } = req.params;
  // List of valid measurement types
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

  // Split the types string into an array and validate each type
  const requestedTypes = types.split(",");
  const invalidTypes = requestedTypes.filter(
    (type) => !validTypes.includes(type)
  );

  if (invalidTypes.length > 0) {
    return res.status(400).json({
      error: "Invalid types of measurements",
      invalidTypes,
    });
  }

  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const measurements = await getAllMeasurements(limit);

    // Filter the measurements to only include requested types
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
    console.error("Error reading filtered sensor values:", err);
    res.status(500).json({
      error: "Could not read filtered sensor data",
      details: err.message,
    });
  }
});

// Route to receive data from hardware
router.post("/", async (req, res) => {
  const measurement = req.body;
  try {
    const newMeasurement = await createMeasurement(measurement);
    res.status(201).json(newMeasurement); // Return the created measurement
  } catch (err) {
    console.error("Error inserting measurement:", err);
    res.status(500).json({
      error: "Could not save measurement data",
      details: err.message,
    });
  }
});

// Route to delete measurements based on time interval
//* ADMIN ONLY
router.post("/delete", authenticateJWT, authorizeAdmin, async (req, res) => {
  const { startTime, endTime } = req.body;

  // Validate time interval
  if (!startTime || !endTime) {
    return res.status(400).json({
      error: "Both startTime and endTime must be provided",
    });
  }

  try {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        error: "Invalid date format. Use ISO 8601 (e.g. 2023-01-01T00:00:00Z)",
      });
    }

    if (start > end) {
      return res.status(400).json({
        error: "startTime must be earlier than endTime",
      });
    }

    const deletedCount = await deleteMeasurements(start, end);

    res.json({
      deletedCount,
      message: `Measurements between ${startTime} and ${endTime} have been deleted`,
    });
  } catch (err) {
    console.error("Error deleting measurements:", err);
    res.status(500).json({
      error: "Could not delete measurements",
      details: err.message,
    });
  }
});

// Swagger documentation
/**
 * @swagger
 * /measurements:
 *   get:
 *     summary: Route to fetch all values from both sensors
 *     tags: [public]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of measurements to return
 *     responses:
 *       200:
 *         description: All measurements.
 *       500:
 *         description: Error reading all sensor values
 */

/**
 * @swagger
 * /measurements/{types}:
 *   get:
 *     summary: Fetch specific types of measurements
 *     tags: [public]
 *     parameters:
 *       - in: path
 *         name: types
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated types of measurements
 *         example: temperature,humidity,aqi
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of measurements to return
 *         example: 10
 *     responses:
 *       200:
 *         description: Filtered measurements
 *       400:
 *         description: Invalid type of measurement
 */

/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Upload a set of measurement values from sensor.
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
 *                 description: ISO 8601 timestamp (optional)
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
 *         description: New measurement values have been stored.
 *       400:
 *         description: Data error (e.g. missing or invalid fields).
 */

/**
 * @swagger
 * /measurements/delete:
 *   post:
 *     summary: Delete measurements based on time interval
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
 *                 description: Start time for the interval (ISO 8601)
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: End time for the interval (ISO 8601)
 *     responses:
 *       200:
 *         description: Measurements have been deleted
 *       400:
 *         description: Invalid time interval
 *       500:
 *         description: Server error during deletion
 */

export default router;
