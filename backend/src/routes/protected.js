import express from "express";
import measurements from "./measurementsRoutes.js";
import sensorsRoutes from "./sensors.js"; 

const router = express.Router();

// Routes för de olika endpointsen
router.use("/measurements", authorize, measurements); // TODO Flytta authorize till server.js.
router.use("/sensors", authorize, sensorsRoutes);

export default router;

function authorize (req, res, next) {
    // Replace this function with proper middleware.
    console.log('Authorizing... ACCESS GRANTED.');
    next();
}