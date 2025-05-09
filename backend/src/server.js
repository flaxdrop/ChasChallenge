import express from "express";
import { PORT } from "./config/index.js";
import apiRoutes from "./routes/apiRoutes.js"; // Importera routes
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

// Swagger-dokumentation
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AirAware API",
      description: "API-dokumentation för AirAwares API.",
      version: "1.0.0",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Lokal utvecklingsserver",
    },
  ],
  tags: [
    { name: "App", descrition: "Endpoints för appen." },
    { name: "Sensor", description: "Endpoints för sensor." },
  ],
  components: {
    schemas: {},
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Använd routes
app.use("/", apiRoutes); // Använd routes

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
