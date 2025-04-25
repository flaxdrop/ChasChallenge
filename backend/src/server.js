import express from "express";
import { PORT } from "./config/index.js";
import apiRoutes from "./routes/apiRoutes.js"; // Importera routes
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerSpec.js";

const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

// Swagger-dokumentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Använd routes
app.use("/", apiRoutes); // Använd routes

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
