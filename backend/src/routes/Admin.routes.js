import express from "express";
/* import measurementsRouter from "./measurementsRoutes.js";
import sensorsRouter from "./sensors.js";  */
import authenticateJWT from "../middleware/auth/authenticateJWT.js";
import { getAllUsers, updateUserRole } from "../controllers/usersController.js";

const router = express.Router();

/**
 * @swagger
 * /admin/users:
 *  get:
 *    summary: Get all users
 *    tags:
 *      - admin
 *    responses:
 *      200:
 *        description: All users
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.get("/users", getAllUsers);
/**
 * @swagger
 * /admin/users/{id}/role:
 *  patch:
 *    summary: Update user role to 'admin' or 'user'
 *    tags:
 *      - admin
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              role:
 *                type: string
 *                example: admin
 *    responses:
 *      200:
 *        description: User updated
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      401:
 *        description: Unauthorized – Token missing or invalid
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      403:
 *        description: Forbidden – You do not have permission
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.patch("/users/:id/role", updateUserRole);

// todo admin allowed to delete other users ?

export default router;
