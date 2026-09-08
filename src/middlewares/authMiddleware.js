const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const authenticateToken = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).json({
                "message": "Access token is missing"
            })
        }
        const token = req.headers['authorization'].split(' ')[1]
        const hasToken = jwt.verify(token, secretKey)
        req.user = hasToken
        next()
    } catch (error) {
        return res.status(403).json({
            "message": "Invalid or expired token",
        })
    }
}

module.exports = { authenticateToken }