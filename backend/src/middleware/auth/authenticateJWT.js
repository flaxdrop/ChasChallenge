//middleware/auth/authenticateJWT.js
import jwt from 'jsonwebtoken';
import { NODE_ENV, UNSAFE_ALLOW_MISSING_AUTHENTICATION } from '../../config/index.js';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Bypass need for auth header in order to not break sensor and app not yet sending it.
  if(!authHeader && NODE_ENV == 'dev' && UNSAFE_ALLOW_MISSING_AUTHENTICATION) {
    res.locals.user = {role: 'admin'};
    next();
    return;
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;  // decoded contains { id, role, iat, exp }
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authenticateJWT;