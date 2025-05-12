import express from "express";
import measurements from "./measurementsRoutes.js";
import sensorsRoutes from "./sensors.js"; 

const router = express.Router();

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

// Routes för de olika endpointsen
router.use("/measurements", measurements);
router.use("/sensors", sensorsRoutes);

export default router;
