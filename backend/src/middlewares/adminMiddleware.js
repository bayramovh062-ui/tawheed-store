const authorizeAdmin = (req, res, next) => {
    if (req.user) {
        if (req.user.role === "ADMIN") {
            return next()
        }
    }
    return res.status(403).json({
        "message": "Access denied. Admin resources only"
    })
}

module.exports = { authorizeAdmin }