function authorize(role) {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (userRole === role) {
            next();
        } else {
            res.status(403).json({ error: 'Access denied' });
        }
    };
}

export const authorizeAdmin = authorize('admin');
export const authorizeUser = authorize('user');

