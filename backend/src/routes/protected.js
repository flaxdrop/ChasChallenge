import express from "express";
import measurementsRouter from "./measurementsRoutes.js";
import sensorsRouter from "./sensors.js"; 
import authorize from "../middleware/authorize.js";

const router = express.Router();

// Protect all routes in file.
router.use(authorize);

// Routes för de olika endpointsen
router.use("/measurements", measurementsRouter);
router.use("/sensors", sensorsRouter);

export default router;