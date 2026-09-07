
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body)
            return next()
        } catch (error) {
            return res.status(400).json({
                "message": `validation failed`,
                "errors": error.errors
            })
        }
    }


}

module.exports = { validationMiddleware }