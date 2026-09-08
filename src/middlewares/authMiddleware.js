const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../utils/asyncHandler')
const { AppError } = require('../utils/AppError')
const secretKey = process.env.JWT_SECRET

const authenticateToken = asyncHandler(async (req, res, next) => {
    if (!req.headers['authorization']) {
        throw new AppError("Access token is missing", 401)
    }
    const token = req.headers['authorization'].split(' ')[1]
    const hasToken = jwt.verify(token, secretKey)
    req.user = hasToken
    next()

})

module.exports = { authenticateToken }