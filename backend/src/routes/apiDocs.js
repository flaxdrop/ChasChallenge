import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = express.Router();

// Swagger-dokumentation
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AirAware API",
      description: "API-dokumentation för AirAwares API.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://chaschallenge-backend.onrender.com/",
        description: "Live server på render med databas på neon.",
      },
      {
        url: "http://localhost:3000",
        description: "Lokal utvecklingsserver",
      },
    ],
    tags: [
      { name: "public", description: "Public endpoints for app" },
      { name: "sensor", description: "Sensor endpoints, for sensor status" },
      { name: "admin", description: "Admin endpoints, requires admin role" },
      { name: "user", description: "User endpoints, requires user or admin role" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


export default router;
