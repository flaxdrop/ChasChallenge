import express from "express";
import { PORT } from "./config/index.js";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();

// Middleware för att hantera JSON-data
app.use(express.json());

app.use("/", apiRoutes);

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
