// routes/User.routes.js
//* Authorized user routes, requires JWT token -- see Protected.routes.js

import express from "express";
import { getUserDetails, deleteUser } from "../controllers/usersController.js";
import authenticateJWT from "../middleware/auth/authenticateJWT.js";

const router = express.Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of the authenticated user
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", getUserDetails);

/**
 * @swagger
 * /profile/delete:
 *   delete:
 *     summary: Delete user account
 *     description: Delete the authenticated user's account
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete", deleteUser);

export default router;
