import express from "express";
import { PORT } from "./config/index.js";
import apiRoutes from "./routes/apiRoutes.js"; // Importera routes
import apiDocs from "./routes/apiDocs.js"; // Importera API docs
import CORS from "cors";

const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

// Fixa CORS-error
app.use(CORS());

// Använd API-dokumentation
app.use("/", apiDocs); // API routes

// Använd routes
app.use("/", apiRoutes); // Använd routes

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
