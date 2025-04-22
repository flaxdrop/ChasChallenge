import express from "express";
import measurementsRoutes from "./measurementsRoutes.js";
import airQualityRoutes from "./airQualityRoutes.js";
import allDataRoutes from "./allDataRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Välkommen till SyntaxSquad's API!");
});

// Routes för de olika endpointsen
router.use("/all", allDataRoutes);
router.use("/measurements", measurementsRoutes);
router.use("/airquality", airQualityRoutes);

export default router;
