import pool from "../utils/db.js";

const checkUserExists = async (req, res, next) => {
  const { username } = req.body;

  try {
    const result = await pool.query("SELECT 1 FROM users WHERE username = $1", [username]);
    if (result.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists." });
    }
    next();
  } catch (err) {
    console.error("Error checking user existence:", err.message);
    res.status(500).json({ error: "Server error checking user." });
  }
};

export default checkUserExists;
