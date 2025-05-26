import express from "express";
import { getAllSensors, createSensor, updateSensorDetails, patchSensorDetails, getOneSensor, deleteSensor} from "../controllers/sensorsController.js";
import { authorizeAdmin } from "../middleware/auth/authorizeRole.js";
import authenticateJWT from "../middleware/auth/authenticateJWT.js";

const router = express.Router();

//* PUBLIC ROUTES
/**
 * @swagger
 * /sensors:
 *  get:
 *    summary: Hämta en lista på alla tillagda sensorer
 *    tags:
 *      - public
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
 * /sensors/{id}:
 *  get:
 *    summary: Hitta en sensor genom id
 *    tags:
 *      - public
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

//* SENSOR ONLY ROUTES 
//! Currently not protected
// //todo authorize sensor so that only sensors can patch their own details
/**
 * @swagger
 * /sensors/{id}:
 *  patch:
 *    summary: Ersätt en del av sensorinformation genom id, t.ex. statuscode
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


//* ADMIN ONLY ROUTES
/**
 * @swagger
 * /sensors:
 *  post:
 *    summary: Skapa en ny sensor
 *    tags:
 *      - admin
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
router.post("/", authenticateJWT,authorizeAdmin, createSensor);

/**
 * @swagger
 * /sensors/{id}:
 *  put:
 *    summary: Ersätt all sensorinformation genom id
 *    tags:
 *      - admin
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
router.put("/:id", authenticateJWT,authorizeAdmin, updateSensorDetails);  // Full update


/**
 * @swagger
 * /sensors/{id}:
 *  delete:
 *    summary: Radera en sensor genom id
 *    tags:
 *      - admin
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The sensor ID
 *    responses:
 *      200:        
 *        description: Sensor deleted
 *      400:
 *        description: Bad request - Something went wrong
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      404:
 *        description: Sensor not found
 *      500:
 *        description: Failed to delete sensor
 * 
 */
router.delete("/:id", authenticateJWT, authorizeAdmin, deleteSensor);


/* router.use("/bme280", bme280Routes); //? if needed for sensor-specific logic, e.g. get the latest calibration for bme280
router.use("/ens160", ens160Routes); */

export default router;