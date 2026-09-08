const { asyncHandler } = require("../utils/asyncHandler")

const validationMiddleware = (schema) => {
    return asyncHandler((req, res, next) => {
        schema.parse({
            body: req.body || {},
            params: req.params || {},
            query: req.query || {}
        })
        return next()
    })

}

module.exports = { validationMiddleware }