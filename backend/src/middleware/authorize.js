function authorize (req, res, next) {
    // Replace this function with proper middleware.
    console.log('Authorizing... ACCESS GRANTED.');
    next();
}

export default authorize;