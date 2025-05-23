//middleware/auth/authenticateJWT.js
import jwt from 'jsonwebtoken';
import { NODE_ENV, UNSAFE_ALLOW_MISSING_AUTHENTICATION } from '../../config/index.js';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  // Bypass auth in dev mode if allowed (for sensors or apps not sending token yet)
  if (!authHeader && NODE_ENV === 'dev' && UNSAFE_ALLOW_MISSING_AUTHENTICATION) {
    // Set res.locals.user so later middleware can read user info (role = admin)
    res.locals.user = { role: 'admin' };
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Set both req.user and res.locals.user for compatibility with your middlewares
    req.user = decoded;
    res.locals.user = decoded;
    console.log("Decoded JWT user:", decoded);
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
