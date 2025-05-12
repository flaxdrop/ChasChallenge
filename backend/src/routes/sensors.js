import express from "express";
import { getAllSensors, createSensor, updateSensorDetails, patchSensorDetails, getOneSensor} from "../controllers/sensorsController.js";

const router = express.Router();

/**
 * @swagger
 * /sensors:
 *  get:
 *    summary: Hämta en lista på alla tillagda sensorer
 *    tags:
 *      - sensor
 *    responses:
 *      200:
 *        description: All sensors
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Failed to fetch sensors
 */
router.get("/", getAllSensors);

/**
 * @swagger
 * /sensors:
 *  post:
 *    summary: Skapa en ny sensor
 *    tags:
 *      - sensor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:    
 *              model:
 *                type: string
 *                example: bme280
 *              statuscode:
 *                type: number
 *                example: 100
 *              measurementTypes:
 *                type: array
 *                example: ["temperature", "humidity", "pressure"]
 *    responses:
 *      200:        
 *        description: New sensor created
 *      400:
 *        description: Bad request - Missing required keys / Something went wrong
 *      500:
 *        description: Failed to create sensor
router.post("/", createSensor);
router.get("/:id", getOneSensor);
router.put("/:id", updateSensorDetails);  // Full update
router.patch("/:id", patchSensorDetails);  // Partial update


/* router.use("/bme280", bme280Routes); //? if needed for sensor-specific logic, e.g. get the latest calibration for bme280
router.use("/ens160", ens160Routes); */

export default router;