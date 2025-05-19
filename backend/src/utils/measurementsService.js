import pool from "./db.js"; // Importera databasen
import formatInTimeZone from "date-fns-tz";
import utcToZonedTime from "date-fns";

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
  // Använd svensk tidszon
  const swedishTimeZone = "Europe/Stockholm";
  const nowUtc = new Date();
  const timestamp =
    measurement.timestamp ||
    formatInTimeZone(nowUtc, swedishTimeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");

  const {
    temperature,
    humidity,
    pressure,
    aqi,
    tvoc,
    eco2,
    pm1,
    pm2_5,
    pm4,
    pm10,
    nc_0_5,
    nc_1_0,
    nc_2_5,
    nc_4_0,
    nc_10_0,
    typical_particle_size,
  } = measurement;

  const result = await pool.query(
    `INSERT INTO measurements (
      timestamp, temperature, humidity, pressure, aqi, tvoc, eco2,
      pm1, pm2_5, pm4, pm10,
      nc_0_5, nc_1_0, nc_2_5, nc_4_0, nc_10_0,
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
      pm1,
      pm2_5,
      pm4,
      pm10,
      nc_0_5,
      nc_1_0,
      nc_2_5,
      nc_4_0,
      nc_10_0,
      typical_particle_size,
    ]
  );

  return result.rows[0]; // Returnera den skapade posten
};

// Funktion för att ta bort mätningar inom ett tidsintervall
export const deleteMeasurements = async (startTime, endTime) => {
  const result = await pool.query(
    "DELETE FROM measurements WHERE timestamp BETWEEN $1 AND $2 RETURNING id",
    [startTime, endTime]
  );
  return result.rowCount;
};
