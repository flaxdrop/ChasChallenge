import pool from "./db.js"; // Importera databasen

// Funktion för att hämta alla mätningar med valfri begränsning
export const getAllMeasurements = async (limit = null) => {
  const query = limit
    ? "SELECT * FROM measurements ORDER BY timestamp DESC LIMIT $1"
    : "SELECT * FROM measurements ORDER BY timestamp DESC";
  const params = limit ? [limit] : [];
  const result = await pool.query(query, params);
  return result.rows;
};

// Funktion för att skapa en ny mätning
export const createMeasurement = async (measurement) => {
  const { timestamp, temperature, humidity, pressure, aqi, tvoc, eco2 } =
    measurement;

  const result = await pool.query(
    "INSERT INTO measurements (timestamp, temperature, humidity, pressure, aqi, tvoc, eco2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [timestamp, temperature, humidity, pressure, aqi, tvoc, eco2]
  );

  return result.rows[0]; // Returnera den skapade posten
};
