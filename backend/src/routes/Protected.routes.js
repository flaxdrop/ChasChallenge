import express from "express";
import measurementsRouter from "./measurementsRoutes.js";
import sensorsRouter from "./sensors.js"; 
import authenticateJWT from "../middleware/auth/authenticateJWT.js";
import usersRouter from "./User.routes.js";
import adminRouter from "./Admin.routes.js";
import { authorizeAdmin } from "../middleware/auth/authorizeRole.js";

const router = express.Router();

// Protect all routes in file.
router.use(authenticateJWT);

// Routes för de olika endpointsen
router.use("/measurements", measurementsRouter);
router.use("/sensors", sensorsRouter);

// Admin routes
router.use("/admin", authorizeAdmin, adminRouter);
// User routes
router.use("/profile", usersRouter);


export default router;