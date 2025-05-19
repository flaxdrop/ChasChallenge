import express from "express";
import { PORT } from "./config/index.js";
import apiDocs from "./routes/apiDocs.js"; // Importera API docs
import CORS from "cors";
import publicRouter from "./routes/public.js";
import protectedRouter from "./routes/protected.js";

const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

// Fixa CORS-error
app.use(CORS());

// Använd API-dokumentation
app.use("/", apiDocs); // API routes

// Public routes
app.use("/", publicRouter);
// Protected routes authorized by middleware
app.use("/", protectedRouter);

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
