function authorize(allowedRoles) {
  return (req, res, next) => {
    // Get user role from req.user (set by authenticateJWT)
    let role = req.user?.role;

    console.log("User role (authorize):", role);

    if (!role) {
      return res.status(401).json({ error: "Unauthorized: no user info" });
    }

    if (allowedRoles.includes(role)) {
      return next();
    }

    return res.status(403).json({ error: "Access denied" });
  };
}

// Usage examples:
export const authorizeAdmin = authorize(["admin"]);
export const authorizeUserOrAdmin = authorize(["user", "admin"]);
