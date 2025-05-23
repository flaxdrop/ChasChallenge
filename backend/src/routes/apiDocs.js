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
      { name: "app", description: "Endpoints för appen." },
      { name: "sensor", description: "Endpoints för sensor." },
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

/**
 * @swagger
 * tags:
 *   - name: app
 *     description: All application-related endpoints
 *   - name: sensor
 *     description: Sensor-related endpoints
 *   - name: admin
 *     description: Admin-related endpoints, requires admin role
 *   - name: user
 *     description: User-related endpoints, requires user or admin role
 */

/**
 * @swagger
 * /measurements:
 *   get:
 *     summary: Route för att hämta alla värden från båda sensorerna
 *     tags: [app]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Antal mätningar att returnera
 *     responses:
 *       200:
 *         description: Alla mätningar.
 *       500:
 *         description: Fel vid läsning av alla sensorvärden
 */

/**
 * @swagger
 * /measurements/{types}:
 *   get:
 *     summary: Hämta specifika typer av mätningar
 *     tags: [app]
 *     parameters:
 *       - in: path
 *         name: types
 *         required: true
 *         schema:
 *           type: string
 *         description: Kommaseparerade typer av mätningar
 *         example: temperature,humidity,aqi
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Antal mätningar att returnera
 *         example: 10
 *     responses:
 *       200:
 *         description: Filtrerade mätningar
 *       400:
 *         description: Ogiltig typ av mätning
 */

/**
 * @swagger
 * /measurements:
 *   post:
 *     summary: Ladda upp en uppsättning mätvärden från sensor.
 *     tags: [sensor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: ISO 8601-tidsstämpel (valfri)
 *               temperature:
 *                 type: number
 *                 example: 22.5
 *               humidity:
 *                 type: number
 *                 example: 55.2
 *               pressure:
 *                 type: number
 *                 example: 101325
 *               aqi:
 *                 type: integer
 *                 example: 4
 *               tvoc:
 *                 type: number
 *                 example: 150
 *               eco2:
 *                 type: number
 *                 example: 400
 *               pm1:
 *                 type: number
 *                 example: 10.5
 *               pm2_5:
 *                 type: number
 *                 example: 20.3
 *               pm4:
 *                 type: number
 *                 example: 35.1
 *               pm10:
 *                 type: number
 *                 example: 50.7
 *               nc_0_5:
 *                 type: number
 *                 example: 100.2
 *               nc_1_0:
 *                 type: number
 *                 example: 150.8
 *               nc_2_5:
 *                 type: number
 *                 example: 220.4
 *               nc_4_0:
 *                 type: number
 *                 example: 300.9
 *               nc_10_0:
 *                 type: number
 *                 example: 450.6
 *               typical_particle_size:
 *                 type: number
 *                 example: 5.0
 *     responses:
 *       200:
 *         description: Nya mätvärden har lagrats.
 *       400:
 *         description: Fel i datan (t.ex. saknade eller ogiltiga fält).
 */

/**
 * @swagger
 * /measurements/delete:
 *   post:
 *     summary: Ta bort mätningar baserat på tidsintervall
 *     tags: [app]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Starttid för intervallet (ISO 8601)
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: Sluttid för intervallet (ISO 8601)
 *     responses:
 *       200:
 *         description: Mätningar har tagits bort
 *       400:
 *         description: Ogiltigt tidsintervall
 *       500:
 *         description: Serverfel vid borttagning
 */

export default router;
