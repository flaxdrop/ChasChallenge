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
  const {
    timestamp,
    temperature,
    humidity,
    pressure,
    aqi,
    tvoc,
    eco2,
    pm1_0,
    pm2_5,
    pm4_0,
    pm10_0,
    nc0_5,
    nc1_0,
    nc2_5,
    nc4_0,
    nc10_0,
    typical_particle_size,
  } = measurement;

  const result = await pool.query(
    `INSERT INTO measurements (
      timestamp, temperature, humidity, pressure, aqi, tvoc, eco2,
      pm1_0, pm2_5, pm4_0, pm10_0,
      nc0_5, nc1_0, nc2_5, nc4_0, nc10_0,
      typical_particle_size
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11,
      $12, $13, $14, $15, $16,
      $17
    ) RETURNING *`,
    [
      timestamp,
      temperature,
      humidity,
      pressure,
      aqi,
      tvoc,
      eco2,
      pm1_0,
      pm2_5,
      pm4_0,
      pm10_0,
      nc0_5,
      nc1_0,
      nc2_5,
      nc4_0,
      nc10_0,
      typical_particle_size,
    ]
  );

  return result.rows[0]; // Returnera den skapade posten
};
