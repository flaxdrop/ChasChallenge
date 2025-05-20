import express from "express";
import measurementsRouter from "./measurementsRoutes.js";
import sensorsRouter from "./sensors.js"; 
import authorizeRole from "../middleware/auth/authorizeRole.js";
import authenticateJWT from "../middleware/auth/authenticateJWT.js";

const router = express.Router();

// Protect all routes in file.
router.use(authenticateJWT);
router.use(authorizeRole); //TODO replace with proper middleware

// Routes för de olika endpointsen
router.use("/measurements", measurementsRouter);
router.use("/sensors", sensorsRouter);

export default router;