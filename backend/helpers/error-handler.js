function errorHandler(err, req, res, next) {
    if(err.name === "UnauthorizedError") {
        // jwt authentication error
        res.status(401).json({ message: "The user is not authorized"})
    }

    if(err.name === "ValidationError") {
        // validation error
        res.status(401).json({message: err})
    }

    // default to 500 server error
    return res.status(500).json({message: " 500 server error : "+err});
}

module.exports = errorHandler;