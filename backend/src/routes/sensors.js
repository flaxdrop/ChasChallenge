import express from "express";
import bme280Routes from "./bme280Routes.js";
import ens160Routes from "./ens160Routes.js";
import { getAllSensors, createSensor, updateSensorDetails, patchSensorDetails, getOneSensor} from "../controllers/sensorsController.js";

const router = express.Router();

router.get("/", getAllSensors);
router.post("/", createSensor);
router.get("/:id", getOneSensor);
router.put("/:id", updateSensorDetails);  // Full update
router.patch("/:id", patchSensorDetails);  // Partial update


/* router.use("/bme280", bme280Routes); //? if needed for sensor-specific logic, e.g. get the latest calibration for bme280
router.use("/ens160", ens160Routes); */

export default router;