import express from "express";
import measurements from "./measurementsRoutes.js";
import sensorsRoutes from "./sensors.js"; 

const router = express.Router();

// Routes för de olika endpointsen
router.use("/measurements", measurements); // TODO Flytta authorize till server.js.
router.use("/sensors", sensorsRoutes);

export default router;