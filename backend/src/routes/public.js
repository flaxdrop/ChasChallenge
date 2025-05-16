import express from "express";

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

// Create user
router.post("/users", (req, res) => {
    res.send('User to be created here.');
})

// Login and generate JWT-token
router.post("/login", (req, res) => {
    res.send('Login not yet possible.')
})

export default router;