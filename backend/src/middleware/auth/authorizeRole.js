function authorize(allowedRoles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: no user info' });
      }
      if (allowedRoles.includes(req.user.role)) {
        return next();
      }
      return res.status(403).json({ error: 'Access denied' });
    };
  }
  
  // Usage:
  export const authorizeAdmin = authorize(['admin']);
  export const authorizeUserOrAdmin = authorize(['user', 'admin']);