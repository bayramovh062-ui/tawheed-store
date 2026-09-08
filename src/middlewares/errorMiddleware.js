const { ZodError } = require("zod");

const globalErrorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = undefined

    if (err instanceof ZodError) {
        statusCode = 400
        message = "validation error"
        errors = err.errors
    }

    if (err.name === "JsonWebTokenError") {
        statusCode = 401
        message = "missing credentials"
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 403
        message = "missing or expired token"
    }
    if (err.code === 'P2025') {
        statusCode = 404;
        message = "Requested resource not found";
    }

    if (err.code === 'P2002') {
        statusCode = 400;
        message = "Duplicate field value entered";
    }
    return res.status(statusCode).json({
        status: statusCode >= 500 ? 'error' : 'fail',
        message,
        errors
    });
};

module.exports = { globalErrorMiddleware };