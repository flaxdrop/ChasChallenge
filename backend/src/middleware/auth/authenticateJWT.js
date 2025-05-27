import jwt from "jsonwebtoken";
import pool from "../../utils/db.js";
import {
  NODE_ENV,
  UNSAFE_ALLOW_MISSING_AUTHENTICATION,
} from "../../config/index.js";

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Bypass auth in dev mode if allowed (for sensors or apps not sending token yet)
  if (!authHeader && NODE_ENV === 'dev' && UNSAFE_ALLOW_MISSING_AUTHENTICATION) {
    // Set req.user so later middleware can read user info (role = admin)
    req.user = { role: 'admin' };
    return next();
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { jti } = decoded;

    if (!jti) {
      return res.status(401).json({ error: "Token is missing 'jti'" });
    }

    // Check if token is blacklisted
    const blacklistCheck = await pool.query("SELECT 1 FROM blacklist WHERE jti = $1", [jti]);

    if (blacklistCheck.rowCount > 0) {
      return res.status(401).json({ error: "Token has been blacklisted" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authenticateJWT;
