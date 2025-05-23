//middleware/auth/authenticateJWT.js
import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded JWT user:", decoded);
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authenticateJWT;