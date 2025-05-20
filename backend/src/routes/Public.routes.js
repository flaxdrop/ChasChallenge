import express from "express";
import { createUser } from "../utils/users.js";
import bcrypt from "bcrypt";
import checkUserExists from "../middleware/checkUserExists.js";
import validateRegisterInput from "../middleware/validateRegisterInput.js";
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

// Register route
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
      const user = await createUser({ username, hashedPassword, role });
      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      console.error("Error in /register:", err.message);
      res.status(500).json({ error: "Server error: Failed to create user" });
    }
  }
);

// Login and generate JWT-token
router.post("/login", (req, res) => {
  // TODO
  console.log("Login requested", {body: req.body});
  res.status(500).json({error: 'Login not yet possible.'});
})

export default router;