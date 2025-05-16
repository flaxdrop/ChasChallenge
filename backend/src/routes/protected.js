import express from "express";
import measurementsRouter from "./measurementsRoutes.js";
import sensorsRouter from "./sensors.js"; 

const router = express.Router();

// Routes för de olika endpointsen
router.use("/measurements", measurementsRouter);
router.use("/sensors", sensorsRouter);

export default router;