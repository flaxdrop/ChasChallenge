import express from "express";
import measurementsRouter from "./measurementsRoutes.js";
import authenticateJWT from "../middleware/auth/authenticateJWT.js";
import usersRouter from "./userRoutes.js";
import adminRouter from "./adminRoutes.js";
import { authorizeAdmin } from "../middleware/auth/authorizeRole.js";

const router = express.Router();

// Protect all routes in file.
router.use(authenticateJWT);

// Admin routes
router.use("/admin", authorizeAdmin, adminRouter);
// User routes
router.use("/profile", usersRouter);

export default router;
