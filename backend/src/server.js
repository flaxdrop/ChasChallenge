import express from "express";
import { PORT } from "./config/index.js";
import apiDocs from "./routes/apiDocs.js";
import CORS from "cors";
import publicRouter from "./routes/publicRoutes.js";
import protectedRouter from "./routes/protectedRoutes.js";
import dotenv from "dotenv";
import sensorsRouter from "./routes/sensorsRoutes.js";
import "./jobs/blacklistCleanup.js";

dotenv.config();

const app = express();

// Middleware to handle JSON data
app.use(express.json());

// Fix CORS errors
app.use(CORS());

// Use API documentation
app.use("/", apiDocs); // API routes

// Sensor routes (mixed access routes)
app.use("/sensors", sensorsRouter);

// Public routes
app.use("/", publicRouter);

// Protected routes authorized by middleware
app.use("/", protectedRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
