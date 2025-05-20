import pool from "../../utils/db.js";

const validateUserLogin = async (req, res, next) => {
    const { username } = req.body;
  
    try {
      const result = await pool.query("SELECT id, role, hashedpassword FROM users WHERE username = $1", [username]);
      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials." });
      }
  
      req.user = result.rows[0]; // Attach user to req for password check
      next();
    } catch (err) {
      console.error("Login validation error:", err.message);
      res.status(500).json({ error: "Server error during login." });
    }
  };

  export default validateUserLogin