function authorize (req, res, next) {
    // TODO Replace this function with proper middleware.
    console.warn('WARNING: Not yet authorizing, always granting access.');
    next();
}

export default authorize;