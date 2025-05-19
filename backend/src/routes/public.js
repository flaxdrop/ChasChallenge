import express from "express";
import { createUser } from "../utils/users";
import bcrypt from "bcrypt";

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

// About page // todo add swagger 
//todo add DB logic
router.get("/about", (req, res) => {
  res.send("About page");
});

// Create user
router.post("/register", async (req, res) => {
  // Create new user (unauthenticated)
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existsCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    
    if (existsCheck.rows.length > 0) {
        return res.status(409).json({ error: "Username already exists." });
      }

    const user = await createUser({ username, hashedPassword, role });

    res.status(201).json({ message: "User created successfully", user});
  } catch (err) {
    console.error("Error in /register:", err.message);
    res.status(500).json({ error: "Server error: Failed to create user" });
  }
});

// Login and generate JWT-token
router.post("/login", (req, res) => {
    res.send('Login not yet possible.')
})

export default router;