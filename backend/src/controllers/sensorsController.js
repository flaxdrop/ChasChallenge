import { getSensorDetails, addSensor, updateSensor, patchSensor, getSensorById } from "../utils/sensors.js";

// Function to handle fetching all sensor details
export const getAllSensors = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const sensors = await getSensorDetails(limit);
    res.json({ message: "Fetched all sensors successfully", sensors });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sensors" });
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

// Function to get one specific sensor by ID
export const getOneSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await getSensorById(id);

    if (!sensor) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    res.json({ message: "Fetched sensor successfully", sensor });
  } catch (error) {
    console.error("Error fetching sensor:", error);
    res.status(500).json({ error: "Failed to fetch sensor" });
  }
};

// Function to handle creating a new sensor
export const createSensor = async (req, res) => {
  try {
    const sensor = req.body;
    const newSensor = await addSensor(sensor);
    res.status(201).json({ message: "Sensor added successfully", newSensor });
  } catch (error) {
    console.error("Failed to add sensor:", error);
    res.status(400).json({ error: error.message || "Failed to add sensor" });
  }
};


// Function to handle updating a sensor
export const updateSensorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = req.body;
    const updatedSensor = await updateSensor(id, sensor);

    if (!updatedSensor) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    res.status(200).json({ message: "Sensor updated successfully", updatedSensor });
  } catch (error) {
    console.error("Failed to update sensor:", error);
    res.status(500).json({ error: error.message || "Failed to update sensor" });
  }
};

// Handle partial update of sensor
export const patchSensorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = req.body;
    const updatedSensor = await patchSensor(id, sensor);

    if (!updatedSensor) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    res.status(200).json({ message: "Sensor partially updated successfully", updatedSensor });
  } catch (error) {
    console.error("Failed to partially update sensor:", error);
    res.status(500).json({ error: error.message || "Failed to update sensor" });
  }
};