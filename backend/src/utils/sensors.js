import pool from "./db.js"; 
import { buildPatchQuery } from "./sqlHelpers.js";

// Function to fetch all sensors with optional limit
export const getSensorDetails = async (limit = null) => {
  const query = limit
    ? "SELECT * FROM sensors LIMIT $1"
    : "SELECT * FROM sensors";
  const params = limit ? [limit] : [];
  const result = await pool.query(query, params);
  return result.rows;
};

export const getSensorById = async (id) => {
  const result = await pool.query("SELECT * FROM sensors WHERE id = $1", [id]);
  return result.rows[0];
};

// Function to create a new sensor
export const addSensor = async (sensor) => {
  try {
    const normalized = normalizeSensorData(sensor, true);
    const result = await pool.query(
      "INSERT INTO sensors (model, statuscode, measurement_types) VALUES ($1, $2, $3) RETURNING *",
      [
        normalized.model,
        normalized.statuscode,
        JSON.stringify(normalized.measurementTypes),
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding sensor:", error);
    throw error; // Let controller handle the response
  }
};

  export const updateSensor = async (id, sensor) => {
    try {
        const normalized = normalizeSensorData(sensor, true);
        const result = await pool.query(
        "UPDATE sensors SET model = $2, statuscode = $3, measurement_types = $4 WHERE id = $1 RETURNING *",
        [id, normalized.model, normalized.statuscode, JSON.stringify(normalized.measurementTypes)]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error adding sensor:", error);
        throw error; // Let controller handle the response
    }
  };
  
  export const patchSensor = async (id, sensor) => {
    try {
      // Step 1: Normalize the sensor data
      const normalized = normalizeSensorData(sensor, false);
      
      // Step 2: Use buildPatchQuery to create the query
      const { query, values } = buildPatchQuery("sensors", id, normalized, {
        keyMap: { measurementTypes: "measurement_types" }, // Mapping to match database field names
        jsonKeys: ["measurementTypes"], // Define which fields are JSON
      });
  
      // Step 3: Execute the query
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the updated sensor data
    } catch (error) {
      console.error("Error updating sensor:", error);
      throw error; // Let the controller handle the response
    }
  };

export const deleteSensorFromDB = async (id) => {
    try {
      const result = await pool.query("DELETE FROM sensors WHERE id = $1 RETURNING *", [id]);
      return result.rows[0];
    } catch (error) {
      console.error("DB error in deleteSensorFromDB:", error);
      throw error;
    }
  };

  //* --- helper function ---

const normalizeSensorData = (data, requireAllFields = true) => {
  const { model, statuscode, measurementTypes, measurement_types } = data;

  const normalized = {
    model,
    statuscode,
    measurementTypes: measurementTypes || measurement_types,
  };

  if (requireAllFields) {
    const missing = Object.entries(normalized)
      .filter(([, value]) => value === undefined)
      .map(([key]) => key);

    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(", ")}`);
    }
  }

  return normalized;
};
