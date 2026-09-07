const asyncHandler = (controllerFunction) => {
    return async (req, res, next) => {
        controllerFunction(req, res, next).catch(next)

    }
}
module.exports = { asyncHandler }