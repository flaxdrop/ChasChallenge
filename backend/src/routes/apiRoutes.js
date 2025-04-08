import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Välkommen till SyntaxSquad's API!");
});

router.get("/test", (req, res) => {
  res.send("Detta är en testroute!");
});

export default router;
