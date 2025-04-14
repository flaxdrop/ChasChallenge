import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Välkommen till SyntaxSquad's API!");
});

router.get("/test", (req, res) => {
  res.send("Detta är en testroute!");
});

// GET /api/data hämta data
// POST /api/data lägg till data
let data = [];
router.get("/api/data", (req, res) => {
  res.json(data);
});
router.post("/api/data", (req, res) => {
  const newData = req.body
  if (!newData) return res.status(400).json({ error: "Data missing"});
  data.push(newData);
  res.status(200).json({ message: "ok" });
})
// hämta all data eller endast senaste.
router.get("/api/data/all", (req, res) => {
  res.json(data);
});
router.get("/api/data/latest", (req, res) => {
  res.json(data.at(-1));
});

// api för fejkad luftdata
router.get("/api/app", (req, res) => {
	const airQualities = ["Excellent", "Good", "Average", "Bad", "Terrible", "Fart detected"];
	const randomAirQuality = airQualities[Math.floor(Math.random() * airQualities.length)];

	const result = {
		response: "ok",
		data: [
			{
				airQuality: randomAirQuality,
				temp: 20.0,
				date: Date.now(),
				id: Math.random(),
			},
		],
		length: 1,
		secret: "not really",
	}
	
	console.log("App requested data: " + JSON.stringify(result));
	res.status(200).json(result);
});

// endpoint för att ta emot sensordata
router.post("/api/sensor", (req, res) => {
	const newData = req.body;

	console.log("Recieved new data: " + newData);
	res.status(201).json({response: "👍"});
});

export default router;
