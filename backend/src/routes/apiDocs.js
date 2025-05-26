import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = express.Router();

// Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AirAware API",
      description: "API documentation for AirAware's API.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://chaschallenge-backend.onrender.com/",
        description: "Live server on Render with database on Neon.",
      },
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    tags: [
      { name: "public", description: "Public endpoints for app" },
      { name: "sensor", description: "Sensor endpoints, for sensor status" },
      { name: "admin", description: "Admin endpoints, requires admin role" },
      {
        name: "user",
        description: "User endpoints, requires user or admin role",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
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
