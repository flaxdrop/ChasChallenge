function authorize (req, res, next) {
    // TODO Replace this function with proper middleware.
    console.warn('WARNING: Not yet authorizing role, always granting access to all users.');
    next();
}

export default authorize;