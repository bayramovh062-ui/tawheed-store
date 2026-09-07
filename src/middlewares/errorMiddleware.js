const globalErrorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
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
        message
    });
};

module.exports = { globalErrorMiddleware };