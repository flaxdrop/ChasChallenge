import express from "express";
import { addUserToDB } from "../utils/users.js";
import bcrypt from "bcrypt";
import checkUserExists from "../middleware/checkUserExists.js";
import validateRegisterInput from "../middleware/validateRegisterInput.js";
import validateUserLogin from "../middleware/auth/validateUserLogin.js";
import jwt from "jsonwebtoken";
import measurementsRouter from "./measurementsRoutes.js";

const router = express.Router();

// Homepage
router.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
    <title>AirAware API</title>
    <style>
      @media (prefers-color-scheme: dark) {
        body {color: white; background: black}
        a:link {color: lightblue}
        a:visited {color: mediumpurple}
        a:active {color: red}
      }
    </style>

    <h1>AirAware API</h1>
    <p>Välkommen till SyntaxSquad's API!</p>
    <a href=api-docs>Dokumentation</a>`);
});

// Routes to access sensor measurement data
router.use("/measurements", measurementsRouter);

// About page // todo add swagger 
//todo add DB logic
router.get("/about", (req, res) => {
  res.send("About page");
});

// Register route
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user
 *     security: []
 *     tags:
 *       - public
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                     created_at:
 *                       type: string
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post(
  "/register",
  validateRegisterInput,
  checkUserExists,
  async (req, res) => {
    try {
      const { username, password, role = "user" } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const validRoles = ["user", "admin"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }
      const user = await addUserToDB({ username, hashedPassword, role });
      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      console.error("Error in /register:", err.message);
      res.status(500).json({ error: "Server error: Failed to create user" });
    }
  }
);

// Login and generate JWT-token
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login and receive a JWT token
 *     description: Validate user credentials and return a JWT token
 *     security: []
 *     tags:
 *       - public
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
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
router.post("/login", validateUserLogin, async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  const match = await bcrypt.compare(password, user.hashedpassword);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successful", token });
  
})

export default router;

