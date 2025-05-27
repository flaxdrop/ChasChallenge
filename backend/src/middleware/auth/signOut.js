import jwt from "jsonwebtoken";
import pool from "../../utils/db.js";

export const signOut = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ error: "Token missing from header" });
    }

    // Decode the token without verifying to get jti and iat
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.jti || !decoded.iat || !decoded.id) {
      return res.status(400).json({ error: "Malformed token" });
    }

    const query = `
      INSERT INTO blacklist (jti, user_id, minimum_issued_at)
      VALUES ($1, $2, to_timestamp($3))
    `;
    const values = [decoded.jti, decoded.id, decoded.iat];

    await pool.query(query, values);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error signing out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
