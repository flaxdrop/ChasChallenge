// src/testDbConnection.js
import pool from "./utils/db.js";

const testDbConnection = async () => {
  try {
    const res = await pool.query("SELECT * FROM measurements");
    console.log("Data från databasen:", res.rows);
  } catch (err) {
    console.error("Fel vid databasanslutning:", err);
  } finally {
    await pool.end(); // Stäng anslutningen
  }
};

// Kör node src/testDbConnection.js i terminalen för att få fram resultatet

testDbConnection();
