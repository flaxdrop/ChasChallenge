import express from "express";
import measurementsRouter from "./measurementsRoutes.js";
import authenticateJWT from "../middleware/auth/authenticateJWT.js";
import usersRouter from "./userRoutes.js";
import adminRouter from "./adminRoutes.js";
import { authorizeAdmin } from "../middleware/auth/authorizeRole.js";
import { refreshToken } from "../controllers/tokenController.js";


const router = express.Router();

// Protect all routes in file.
router.use(authenticateJWT);

// Admin routes
router.use("/admin", authorizeAdmin, adminRouter);
// User routes
router.use("/profile", usersRouter);


/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh a JWT token
 *     description: Validate token and return a new token with new expiry date.
 *     tags:
 *       - protected
 *     responses:
 *       200:
 *         description: Refresh successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.use("/refresh-token", refreshToken);

export default router;
