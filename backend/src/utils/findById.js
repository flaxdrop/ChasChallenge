import { loadMockData } from "../utils/dataLoader.js";

export const findById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = await loadMockData();
    const match = data.measurements.find((m) => m.id === id);

    if (!match) {
      return res
        .status(404)
        .json({ error: `Ingen mätning med ID ${id} hittades` });
    }

    req.measurement = match; // Gör tillgänglig för kommande route
    next();
  } catch (err) {
    console.error("Fel i findById:", err);
    res
      .status(500)
      .json({ error: "Serverfel vid ID-sökning", details: err.message });
  }
};
