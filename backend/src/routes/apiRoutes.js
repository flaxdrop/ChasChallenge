import express from "express";
import bme280Routes from "./bme280Routes.js";
import ens160Routes from "./ens160Routes.js";
import measurements from "./measurementsRoutes.js";
/* import addDataRoutes from "./addDataRoutes.js"; */
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
router.use("/bme280", bme280Routes);
router.use("/ens160", ens160Routes);

export default router;
