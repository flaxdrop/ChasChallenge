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
 * 
 */
router.post("/", createSensor);

/**
 * @swagger
 * /sensors/{id}:
 *  get:
 *    summary: Hitta en sensor genom id
 *    tags:
 *      - sensor
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The sensor ID
 *    responses:
 *      200:
 *        description: Sensor found
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Failed to fetch sensor
 */
router.get("/:id", getOneSensor);

/**
 * @swagger
 * /sensors/{id}:
 *  put:
 *    summary: Ersätt all sensorinformation genom id
 *    tags:
 *      - sensor
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The sensor ID
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
 *        description: Sensor updated
 *      400:
 *        description: Bad request - Missing required keys / Something went wrong
 *      500:
 *        description: Failed to update sensor
 * 
 */
router.put("/:id", updateSensorDetails);  // Full update

/**
 * @swagger
 * /sensors/{id}:
 *  patch:
 *    summary: Ersätt en del av sensorinformation genom id
 *    tags:
 *      - sensor
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The sensor ID
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
 *        description: Sensor updated
 *      400:
 *        description: Bad request - Missing required keys / Something went wrong
 *        content:
 *          application/json:
 *            example:
 *              error: "Missing required keys: model, statuscode"
 *      404:
 *        description: Sensor not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Sensor hittades inte
 *      500:
 *        description: Failed to update sensor
 * 
 */
router.patch("/:id", patchSensorDetails);  // Partial update


/* router.use("/bme280", bme280Routes); //? if needed for sensor-specific logic, e.g. get the latest calibration for bme280
router.use("/ens160", ens160Routes); */

export default router;